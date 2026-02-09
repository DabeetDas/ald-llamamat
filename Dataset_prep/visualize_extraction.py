#!/usr/bin/env python3
"""
PDF Extraction Log Visualizer

Parses extraction.log and generates visualizations of the extraction results.
"""

import re
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime
from collections import defaultdict
import os
import numpy as np
from pathlib import Path

# Define the log file path
LOG_FILE = os.path.join(os.path.dirname(__file__), "extraction.log")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "visualizations")
DATA_DIR = "/home/dabeet/Desktop/ald-llamamat/Data"


def parse_log_file(log_path: str) -> dict:
    """Parse the extraction log and extract key statistics."""
    
    stats = {
        "successful": 0,
        "failed_to_read": 0,
        "empty_scanned": 0,
        "total_images": 0,
        "total_pdfs": 0,
        "empty_pdfs": [],
        "warnings_by_type": defaultdict(int),
        "warnings_over_time": defaultdict(int),
        "extraction_timeline": [],
    }
    
    # Regex patterns
    summary_patterns = {
        "total_pdfs": re.compile(r"Found (\d+) PDF files to process"),
        "successful": re.compile(r"Successful: (\d+)"),
        "failed_to_read": re.compile(r"Failed to read: (\d+)"),
        "empty_scanned": re.compile(r"Empty/Scanned PDFs: (\d+)"),
        "total_images": re.compile(r"Total images extracted: (\d+)"),
    }
    
    # Warning patterns
    empty_pdf_pattern = re.compile(r"\[EMPTY\] (\S+\.pdf): No text extracted")
    timestamp_pattern = re.compile(r"^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})")
    warning_type_patterns = {
        "startxref": re.compile(r"incorrect startxref pointer"),
        "invalid_lookup": re.compile(r"Invalid Lookup Table"),
        "empty_pdf": re.compile(r"\[EMPTY\].*No text extracted"),
        "image_mode": re.compile(r"unrecognized image mode"),
        "mask_mismatch": re.compile(r"image and mask size not matching"),
        "wrong_object": re.compile(r"Ignoring wrong pointing object"),
        "image_failed": re.compile(r"image extraction failed"),
        "parsing_streams": re.compile(r"parsing for Object Streams"),
        "other": None,
    }
    
    with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            
            # Extract timestamp for timeline
            ts_match = timestamp_pattern.match(line)
            if ts_match:
                timestamp = ts_match.group(1)
                minute_key = timestamp[:16]  # Extract yyyy-mm-dd HH:MM
                stats["warnings_over_time"][minute_key] += 1
            
            # Check for summary statistics (use last occurrence)
            for key, pattern in summary_patterns.items():
                match = pattern.search(line)
                if match:
                    stats[key] = int(match.group(1))
            
            # Track empty PDFs
            empty_match = empty_pdf_pattern.search(line)
            if empty_match:
                stats["empty_pdfs"].append(empty_match.group(1))
            
            # Categorize warnings
            if "WARNING" in line:
                categorized = False
                for wtype, pattern in warning_type_patterns.items():
                    if pattern and pattern.search(line):
                        stats["warnings_by_type"][wtype] += 1
                        categorized = True
                        break
                if not categorized:
                    stats["warnings_by_type"]["other"] += 1
    
    return stats


def create_summary_pie_chart(stats: dict, output_dir: str):
    """Create a pie chart showing PDF extraction success/failure breakdown."""
    
    fig, ax = plt.subplots(figsize=(10, 8))
    
    # Data
    labels = ['Successful', 'Empty/Scanned', 'Failed to Read']
    sizes = [stats["successful"], stats["empty_scanned"], stats["failed_to_read"]]
    colors = ['#2ecc71', '#f39c12', '#e74c3c']
    explode = (0.02, 0.05, 0.05)
    
    # Filter out zero values
    filtered_data = [(l, s, c, e) for l, s, c, e in zip(labels, sizes, colors, explode) if s > 0]
    if filtered_data:
        labels, sizes, colors, explode = zip(*filtered_data)
    
    wedges, texts, autotexts = ax.pie(
        sizes, 
        explode=explode, 
        labels=labels, 
        colors=colors,
        autopct=lambda pct: f'{pct:.1f}%\n({int(pct/100*sum(sizes)):,})',
        shadow=True, 
        startangle=90,
        textprops={'fontsize': 12, 'fontweight': 'bold'}
    )
    
    ax.set_title(f'PDF Extraction Results\n(Total: {stats["total_pdfs"]:,} PDFs)', 
                 fontsize=16, fontweight='bold', pad=20)
    
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'extraction_summary_pie.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print(f"✓ Created: extraction_summary_pie.png")


def create_warnings_bar_chart(stats: dict, output_dir: str):
    """Create a bar chart showing warning types distribution."""
    
    fig, ax = plt.subplots(figsize=(12, 7))
    
    # Sort warnings by count
    warnings = dict(sorted(stats["warnings_by_type"].items(), key=lambda x: x[1], reverse=True))
    
    # Prettier labels
    label_map = {
        "startxref": "Startxref Pointer",
        "invalid_lookup": "Invalid Lookup Table",
        "empty_pdf": "Empty/Scanned PDF",
        "image_mode": "Unrecognized Image Mode",
        "mask_mismatch": "Image/Mask Mismatch",
        "wrong_object": "Wrong Object Pointer",
        "image_failed": "Image Extraction Failed",
        "parsing_streams": "Parsing Object Streams",
        "other": "Other Warnings",
    }
    
    labels = [label_map.get(k, k) for k in warnings.keys()]
    values = list(warnings.values())
    
    # Color gradient
    colors = plt.cm.viridis([(i+1)/(len(values)+1) for i in range(len(values))])
    
    bars = ax.barh(labels, values, color=colors, edgecolor='black', linewidth=0.5)
    
    # Add value labels
    for bar, val in zip(bars, values):
        ax.text(bar.get_width() + max(values)*0.01, bar.get_y() + bar.get_height()/2,
                f'{val:,}', va='center', fontsize=10, fontweight='bold')
    
    ax.set_xlabel('Number of Occurrences', fontsize=12, fontweight='bold')
    ax.set_title('Warning Types During PDF Extraction', fontsize=14, fontweight='bold', pad=15)
    ax.invert_yaxis()
    ax.set_xlim(0, max(values) * 1.15)
    
    # Add grid
    ax.grid(axis='x', alpha=0.3, linestyle='--')
    ax.set_axisbelow(True)
    
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'warnings_distribution.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print(f"✓ Created: warnings_distribution.png")


def create_timeline_chart(stats: dict, output_dir: str):
    """Create a timeline showing extraction activity over time."""
    
    if not stats["warnings_over_time"]:
        print("⚠ No timeline data available")
        return
    
    fig, ax = plt.subplots(figsize=(14, 6))
    
    # Parse timestamps and sort
    timeline = sorted(stats["warnings_over_time"].items())
    
    if len(timeline) < 2:
        print("⚠ Not enough timeline data for visualization")
        return
    
    times = [datetime.strptime(t, "%Y-%m-%d %H:%M") for t, _ in timeline]
    counts = [c for _, c in timeline]
    
    ax.fill_between(times, counts, alpha=0.4, color='#3498db')
    ax.plot(times, counts, color='#2980b9', linewidth=2, marker='o', markersize=3)
    
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%H:%M'))
    ax.xaxis.set_major_locator(mdates.MinuteLocator(interval=5))
    
    plt.xticks(rotation=45, ha='right')
    
    ax.set_xlabel('Time (HH:MM)', fontsize=12, fontweight='bold')
    ax.set_ylabel('Log Messages per Minute', fontsize=12, fontweight='bold')
    ax.set_title('Extraction Activity Timeline', fontsize=14, fontweight='bold', pad=15)
    
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.set_axisbelow(True)
    
    # Add extraction duration info
    duration = (times[-1] - times[0])
    duration_str = f"{duration.seconds // 60} min {duration.seconds % 60} sec"
    ax.text(0.02, 0.98, f'Duration: {duration_str}', transform=ax.transAxes,
            fontsize=10, verticalalignment='top', 
            bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))
    
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'extraction_timeline.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print(f"✓ Created: extraction_timeline.png")


def create_summary_dashboard(stats: dict, output_dir: str):
    """Create a comprehensive dashboard with multiple visualizations."""
    
    fig = plt.figure(figsize=(16, 12))
    fig.suptitle('PDF Extraction Dataset Summary Dashboard', fontsize=18, fontweight='bold', y=0.98)
    
    # Create grid layout
    gs = fig.add_gridspec(3, 3, hspace=0.35, wspace=0.3)
    
    # 1. Main metrics (top-left, larger)
    ax1 = fig.add_subplot(gs[0, :2])
    metrics = [
        ('Total PDFs', stats['total_pdfs'], '#3498db'),
        ('Successful', stats['successful'], '#2ecc71'),
        ('Empty/Scanned', stats['empty_scanned'], '#f39c12'),
        ('Failed', stats['failed_to_read'], '#e74c3c'),
        ('Images Extracted', stats['total_images'], '#9b59b6'),
    ]
    
    x_pos = range(len(metrics))
    bars = ax1.bar(x_pos, [m[1] for m in metrics], color=[m[2] for m in metrics], 
                   edgecolor='black', linewidth=0.5)
    ax1.set_xticks(x_pos)
    ax1.set_xticklabels([m[0] for m in metrics], fontsize=10, fontweight='bold')
    ax1.set_ylabel('Count', fontsize=11, fontweight='bold')
    ax1.set_title('Extraction Metrics Overview', fontsize=13, fontweight='bold', pad=10)
    
    for bar, metric in zip(bars, metrics):
        height = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width()/2., height,
                f'{metric[1]:,}', ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    ax1.set_ylim(0, max([m[1] for m in metrics]) * 1.15)
    ax1.grid(axis='y', alpha=0.3, linestyle='--')
    ax1.set_axisbelow(True)
    
    # 2. Success rate gauge (top-right)
    ax2 = fig.add_subplot(gs[0, 2])
    success_rate = (stats['successful'] / stats['total_pdfs'] * 100) if stats['total_pdfs'] > 0 else 0
    
    colors_gauge = ['#e74c3c' if success_rate < 50 else '#f39c12' if success_rate < 80 else '#2ecc71']
    wedges, _ = ax2.pie([success_rate, 100-success_rate], 
                        colors=[colors_gauge[0], '#ecf0f1'],
                        startangle=90, counterclock=False,
                        wedgeprops=dict(width=0.3, edgecolor='white'))
    
    ax2.text(0, 0, f'{success_rate:.1f}%', ha='center', va='center', 
             fontsize=24, fontweight='bold', color=colors_gauge[0])
    ax2.set_title('Success Rate', fontsize=13, fontweight='bold', pad=10)
    
    # 3. Warning categories (middle row)
    ax3 = fig.add_subplot(gs[1, :])
    
    warnings = dict(sorted(stats["warnings_by_type"].items(), key=lambda x: x[1], reverse=True))
    label_map = {
        "startxref": "Startxref", "invalid_lookup": "Invalid Lookup",
        "empty_pdf": "Empty PDF", "image_mode": "Image Mode",
        "mask_mismatch": "Mask Mismatch", "wrong_object": "Wrong Object",
        "image_failed": "Image Failed", "parsing_streams": "Parsing Streams",
        "other": "Other",
    }
    
    labels = [label_map.get(k, k) for k in warnings.keys()]
    values = list(warnings.values())
    colors_bar = plt.cm.coolwarm([(i+1)/(len(values)+1) for i in range(len(values))])
    
    bars = ax3.bar(labels, values, color=colors_bar, edgecolor='black', linewidth=0.5)
    ax3.set_ylabel('Count', fontsize=11, fontweight='bold')
    ax3.set_title('Warning Types Breakdown', fontsize=13, fontweight='bold', pad=10)
    plt.setp(ax3.get_xticklabels(), rotation=30, ha='right', fontsize=9)
    
    for bar, val in zip(bars, values):
        ax3.text(bar.get_x() + bar.get_width()/2., bar.get_height(),
                f'{val:,}', ha='center', va='bottom', fontsize=9, fontweight='bold')
    
    ax3.set_ylim(0, max(values) * 1.15)
    ax3.grid(axis='y', alpha=0.3, linestyle='--')
    ax3.set_axisbelow(True)
    
    # 4. Images per successful PDF (bottom-left)
    ax4 = fig.add_subplot(gs[2, 0])
    images_per_pdf = stats['total_images'] / stats['successful'] if stats['successful'] > 0 else 0
    
    ax4.text(0.5, 0.5, f'{images_per_pdf:.1f}', ha='center', va='center',
             fontsize=40, fontweight='bold', color='#9b59b6', transform=ax4.transAxes)
    ax4.text(0.5, 0.2, 'Images per PDF\n(average)', ha='center', va='center',
             fontsize=11, color='#7f8c8d', transform=ax4.transAxes)
    ax4.axis('off')
    ax4.set_title('Extraction Density', fontsize=13, fontweight='bold', pad=10)
    
    # 5. Empty PDFs list (bottom-middle and bottom-right)
    ax5 = fig.add_subplot(gs[2, 1:])
    ax5.axis('off')
    
    if stats['empty_pdfs']:
        empty_list = '\n'.join([f'• {pdf}' for pdf in stats['empty_pdfs'][:15]])
        if len(stats['empty_pdfs']) > 15:
            empty_list += f'\n... and {len(stats["empty_pdfs"]) - 15} more'
        ax5.text(0.05, 0.95, 'Empty/Scanned PDFs:', fontsize=12, fontweight='bold',
                 va='top', transform=ax5.transAxes)
        ax5.text(0.05, 0.85, empty_list, fontsize=9, va='top', 
                 transform=ax5.transAxes, family='monospace',
                 bbox=dict(boxstyle='round', facecolor='#fff3cd', alpha=0.8, edgecolor='#ffc107'))
    else:
        ax5.text(0.5, 0.5, 'No empty PDFs detected!', ha='center', va='center',
                 fontsize=14, color='#2ecc71', fontweight='bold', transform=ax5.transAxes)
    
    ax5.set_title('Empty/Scanned PDFs', fontsize=13, fontweight='bold', pad=10)
    
    plt.savefig(os.path.join(output_dir, 'extraction_dashboard.png'), dpi=150, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print(f"✓ Created: extraction_dashboard.png")


def scan_extracted_images(data_dir: str) -> dict:
    """Scan the extracted images directory and gather statistics."""
    
    print("🔍 Scanning extracted images (this may take a moment)...")
    
    image_stats = {
        "images_per_pdf": [],
        "image_sizes": [],
        "total_size_bytes": 0,
        "total_images": 0,
        "pdfs_with_images": 0,
        "pdfs_without_images": 0,
        "image_formats": defaultdict(int),
    }
    
    data_path = Path(data_dir)
    if not data_path.exists():
        print(f"⚠ Data directory not found: {data_dir}")
        return image_stats
    
    # Iterate through paper folders
    for paper_dir in data_path.iterdir():
        if paper_dir.is_dir() and paper_dir.name.startswith("paper"):
            images_dir = paper_dir / "Images"
            
            if images_dir.exists():
                image_files = list(images_dir.glob("*"))
                image_count = len(image_files)
                
                if image_count > 0:
                    image_stats["pdfs_with_images"] += 1
                    image_stats["images_per_pdf"].append(image_count)
                    
                    for img_file in image_files:
                        if img_file.is_file():
                            size = img_file.stat().st_size
                            image_stats["image_sizes"].append(size)
                            image_stats["total_size_bytes"] += size
                            image_stats["total_images"] += 1
                            
                            # Track format
                            ext = img_file.suffix.lower()
                            image_stats["image_formats"][ext] += 1
                else:
                    image_stats["pdfs_without_images"] += 1
            else:
                image_stats["pdfs_without_images"] += 1
    
    print(f"   Found {image_stats['total_images']:,} images in {image_stats['pdfs_with_images']:,} PDFs")
    return image_stats


def create_image_stats_visualization(image_stats: dict, output_dir: str):
    """Create visualizations for extracted image statistics."""
    
    if not image_stats["images_per_pdf"]:
        print("⚠ No image data available for visualization")
        return
    
    fig = plt.figure(figsize=(16, 10))
    fig.suptitle('Extracted Images Analysis', fontsize=18, fontweight='bold', y=0.98)
    
    gs = fig.add_gridspec(2, 3, hspace=0.3, wspace=0.3)
    
    # 1. Images per PDF histogram
    ax1 = fig.add_subplot(gs[0, 0])
    images_per_pdf = np.array(image_stats["images_per_pdf"])
    
    # Use bins that make sense for the data
    max_images = min(images_per_pdf.max(), 50)  # Cap for visualization
    bins = np.arange(0, max_images + 2, max(1, max_images // 20))
    
    ax1.hist(images_per_pdf[images_per_pdf <= max_images], bins=bins, 
             color='#3498db', edgecolor='black', linewidth=0.5, alpha=0.8)
    ax1.set_xlabel('Number of Images', fontsize=11, fontweight='bold')
    ax1.set_ylabel('Number of PDFs', fontsize=11, fontweight='bold')
    ax1.set_title('Images per PDF Distribution', fontsize=13, fontweight='bold', pad=10)
    ax1.grid(axis='y', alpha=0.3, linestyle='--')
    ax1.set_axisbelow(True)
    
    # Add stats box
    stats_text = f'Mean: {images_per_pdf.mean():.1f}\nMedian: {np.median(images_per_pdf):.0f}\nMax: {images_per_pdf.max():.0f}'
    ax1.text(0.95, 0.95, stats_text, transform=ax1.transAxes, fontsize=9,
             verticalalignment='top', horizontalalignment='right',
             bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))
    
    # 2. Image size distribution
    ax2 = fig.add_subplot(gs[0, 1])
    sizes_kb = np.array(image_stats["image_sizes"]) / 1024  # Convert to KB
    
    # Use log scale for better visualization
    ax2.hist(sizes_kb, bins=50, color='#9b59b6', edgecolor='black', 
             linewidth=0.5, alpha=0.8, log=True)
    ax2.set_xlabel('Image Size (KB)', fontsize=11, fontweight='bold')
    ax2.set_ylabel('Count (log scale)', fontsize=11, fontweight='bold')
    ax2.set_title('Image Size Distribution', fontsize=13, fontweight='bold', pad=10)
    ax2.grid(axis='y', alpha=0.3, linestyle='--')
    ax2.set_axisbelow(True)
    
    # Add stats box
    stats_text = f'Mean: {sizes_kb.mean():.1f} KB\nMedian: {np.median(sizes_kb):.1f} KB\nTotal: {image_stats["total_size_bytes"]/1024/1024:.1f} MB'
    ax2.text(0.95, 0.95, stats_text, transform=ax2.transAxes, fontsize=9,
             verticalalignment='top', horizontalalignment='right',
             bbox=dict(boxstyle='round', facecolor='#e8daef', alpha=0.8))
    
    # 3. Image formats pie chart
    ax3 = fig.add_subplot(gs[0, 2])
    formats = image_stats["image_formats"]
    if formats:
        labels = [f.upper().replace('.', '') for f in formats.keys()]
        values = list(formats.values())
        colors = plt.cm.Set3(range(len(labels)))
        
        wedges, texts, autotexts = ax3.pie(values, labels=labels, colors=colors,
                                            autopct='%1.1f%%', startangle=90,
                                            textprops={'fontsize': 10})
        ax3.set_title('Image Format Distribution', fontsize=13, fontweight='bold', pad=10)
    
    # 4. PDFs with/without images
    ax4 = fig.add_subplot(gs[1, 0])
    categories = ['With Images', 'Without Images']
    counts = [image_stats["pdfs_with_images"], image_stats["pdfs_without_images"]]
    colors = ['#2ecc71', '#e74c3c']
    
    bars = ax4.bar(categories, counts, color=colors, edgecolor='black', linewidth=0.5)
    ax4.set_ylabel('Number of PDFs', fontsize=11, fontweight='bold')
    ax4.set_title('PDFs by Image Content', fontsize=13, fontweight='bold', pad=10)
    
    for bar, val in zip(bars, counts):
        ax4.text(bar.get_x() + bar.get_width()/2., bar.get_height(),
                f'{val:,}', ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    ax4.set_ylim(0, max(counts) * 1.15)
    ax4.grid(axis='y', alpha=0.3, linestyle='--')
    ax4.set_axisbelow(True)
    
    # 5. Summary stats panel
    ax5 = fig.add_subplot(gs[1, 1:])
    ax5.axis('off')
    
    total_mb = image_stats["total_size_bytes"] / 1024 / 1024
    avg_per_pdf = np.mean(images_per_pdf) if len(images_per_pdf) > 0 else 0
    avg_size_kb = np.mean(sizes_kb) if len(sizes_kb) > 0 else 0
    
    summary_text = f"""
    📊 IMAGE EXTRACTION SUMMARY
    ══════════════════════════════════════
    
    Total Images Extracted:     {image_stats['total_images']:,}
    Total Storage Used:         {total_mb:.1f} MB
    
    PDFs with Images:           {image_stats['pdfs_with_images']:,}
    PDFs without Images:        {image_stats['pdfs_without_images']:,}
    
    Average Images per PDF:     {avg_per_pdf:.1f}
    Average Image Size:         {avg_size_kb:.1f} KB
    
    Smallest Image:             {min(sizes_kb):.2f} KB
    Largest Image:              {max(sizes_kb):.1f} KB
    """
    
    ax5.text(0.1, 0.95, summary_text, transform=ax5.transAxes, fontsize=12,
             verticalalignment='top', family='monospace',
             bbox=dict(boxstyle='round', facecolor='#d5f5e3', alpha=0.8, edgecolor='#27ae60'))
    
    plt.savefig(os.path.join(output_dir, 'image_extraction_stats.png'), dpi=150, 
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print(f"✓ Created: image_extraction_stats.png")


def print_summary(stats: dict):
    """Print a text summary of the extraction results."""
    
    print("\n" + "="*60)
    print("           PDF EXTRACTION DATASET SUMMARY")
    print("="*60)
    print(f"  Total PDFs processed:     {stats['total_pdfs']:,}")
    print(f"  Successfully extracted:   {stats['successful']:,}")
    print(f"  Empty/Scanned PDFs:       {stats['empty_scanned']:,}")
    print(f"  Failed to read:           {stats['failed_to_read']:,}")
    print(f"  Total images extracted:   {stats['total_images']:,}")
    
    if stats['successful'] > 0:
        success_rate = stats['successful'] / stats['total_pdfs'] * 100
        images_per_pdf = stats['total_images'] / stats['successful']
        print(f"\n  Success rate:             {success_rate:.1f}%")
        print(f"  Avg images per PDF:       {images_per_pdf:.1f}")
    
    print("="*60)
    
    if stats['empty_pdfs']:
        print(f"\n  Empty/Scanned PDFs ({len(stats['empty_pdfs'])}):")
        for pdf in stats['empty_pdfs']:
            print(f"    - {pdf}")
    
    print("\n  Warning Types Summary:")
    for wtype, count in sorted(stats['warnings_by_type'].items(), key=lambda x: -x[1]):
        print(f"    {wtype:25} {count:,}")
    
    print("="*60 + "\n")


def main():
    """Main function to run the visualization pipeline."""
    
    print("\n🔍 Parsing extraction log...")
    
    if not os.path.exists(LOG_FILE):
        print(f"❌ Error: Log file not found at {LOG_FILE}")
        return
    
    stats = parse_log_file(LOG_FILE)
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"📁 Output directory: {OUTPUT_DIR}")
    
    # Print text summary
    print_summary(stats)
    
    # Generate visualizations
    print("📊 Generating visualizations...")
    
    create_summary_pie_chart(stats, OUTPUT_DIR)
    create_warnings_bar_chart(stats, OUTPUT_DIR)
    create_timeline_chart(stats, OUTPUT_DIR)
    create_summary_dashboard(stats, OUTPUT_DIR)
    
    # Scan and visualize image extraction stats
    image_stats = scan_extracted_images(DATA_DIR)
    if image_stats["total_images"] > 0:
        create_image_stats_visualization(image_stats, OUTPUT_DIR)
    
    print(f"\n✅ All visualizations saved to: {OUTPUT_DIR}")
    print("   - extraction_summary_pie.png")
    print("   - warnings_distribution.png")
    print("   - extraction_timeline.png")
    print("   - extraction_dashboard.png")
    print("   - image_extraction_stats.png")


if __name__ == "__main__":
    main()
