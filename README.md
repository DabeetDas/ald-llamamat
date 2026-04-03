# ALD-LlamaMat: GenAI for Atomic Layer Deposition Research

> Using Generative AI to Accelerate Research in Atomic Layer Deposition for Thin Films

## Overview

ALD-LlamaMat is a comprehensive research project combining generative AI techniques with materials science to advance atomic layer deposition (ALD) research. This repository serves as the central hub for UGP-1 (MSE496), a collaborative effort to leverage large language models and AI-assisted workflows to improve ALD thin film research and development.

The project features an automated data extraction pipeline and a modern Next.js visualization dashboard that maps ALD data into an interactive interface backed by a cloud database and object storage.

## Project Goals

- Harness GenAI Power: Apply large language models to accelerate ALD research workflows
- Data Intelligence: Build datasets and leverage AI for materials science insights
- Web Application: Provide an interactive Next.js dashboard to visualize metrics, substrate info, and film properties intuitively
- Process Optimization: Use machine learning to understand and optimize ALD processes
- Knowledge Extraction: Automatically extract and synthesize research information from literature
- Practical Tools: Develop user-friendly tools that bridge AI and experimental science

## Repository Structure

```text
ald-llamamat/
├── data-visulisation/     # Next.js web application for ALD data visualization
├── Dataset_prep/          # Data preparation and preprocessing scripts
├── Web Scrapper/          # Tools for collecting ALD-related research data
├── presentations/         # Project presentations and documentation
├── .gitignore             # Git configuration
└── README.md              # This file
```

## Technology Stack

- Language: Python, TypeScript
- Frontend/Web: Next.js (App Router), React, Recharts, TailwindCSS
- Database/Storage: MongoDB Atlas (metadata), Vercel Blob Storage (PDF hosting)
- AI/ML: Large Language Models (Gemini 2.5 Flash, Qwen3-VL-8B, LlaMA-3.1-8B), Generative AI
- Materials Science: ALD-focused research and analysis tools

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+ (for running the web dashboard)
- MongoDB Atlas cluster URL (for the web backend)
- Vercel Blob Token (for PDF hosting)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/DabeetDas/ald-llamamat.git
cd ald-llamamat
```

2. Web Dashboard Setup:
```bash
cd data-visulisation
npm install
```

3. Configure Environment Variables:
Create a `.env.local` file inside `data-visulisation` with the following variables:
```text
MONGODB_URI="your-mongodb-atlas-connection-string"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-rw-token"
```

4. Run the development server:
```bash
npm run dev
```

## Usage

Each subdirectory contains its own set of tools and workflows:

- data-visulisation: Interactive Next.js web app to view all ALD documents, browse their metrics, and converse with an AI assistant
- Dataset_prep: Run preprocessing scripts to prepare your ALD datasets
- Web Scrapper: Execute scraping tools to collect latest research data
- presentations: Review project documentation and presentation materials

Detailed instructions for each module can be found in their respective directories.

## Contributing

This is an active research project. Contributions, suggestions, and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Project Details

- Course: MSE496 (Undergraduate Project)
- Project Code: UGP-1
- Research Focus: Generative AI applications in Atomic Layer Deposition
- Status: Active Development

## Contact & Support

For questions, suggestions, or collaboration inquiries:
- Repository Owner: @DabeetDas
- Issues: Use the Issues tab for bug reports and feature requests
