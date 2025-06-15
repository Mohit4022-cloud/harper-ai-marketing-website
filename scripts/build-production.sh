#!/bin/bash

# Exit on any error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting production build process...${NC}"

# Step 1: Clean previous build
echo -e "${YELLOW}Cleaning previous build...${NC}"
npm run clean

# Step 2: Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm ci

# Step 3: Run type checking
echo -e "${YELLOW}Running type checks...${NC}"
if npm run type-check; then
    echo -e "${GREEN}Type checking passed!${NC}"
else
    echo -e "${RED}Type checking failed!${NC}"
    exit 1
fi

# Step 4: Run linting
echo -e "${YELLOW}Running linting...${NC}"
if npm run lint; then
    echo -e "${GREEN}Linting passed!${NC}"
else
    echo -e "${RED}Linting failed!${NC}"
    echo -e "${YELLOW}Run 'npm run format' to fix formatting issues${NC}"
    exit 1
fi

# Step 5: Build the application
echo -e "${YELLOW}Building the application...${NC}"
if npm run build; then
    echo -e "${GREEN}Build completed successfully!${NC}"
else
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

# Step 6: Run health check
echo -e "${YELLOW}Running health check...${NC}"
if npm run healthcheck; then
    echo -e "${GREEN}Health check passed!${NC}"
else
    echo -e "${RED}Health check failed!${NC}"
    exit 1
fi

# Step 7: Verify build output
echo -e "${YELLOW}Verifying build output...${NC}"
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo -e "${GREEN}Build output verified!${NC}"
    
    # Show build size
    echo -e "${YELLOW}Build size:${NC}"
    du -sh dist/
    
    # Count files
    echo -e "${YELLOW}Total files:${NC}"
    find dist -type f | wc -l
else
    echo -e "${RED}Build output verification failed!${NC}"
    exit 1
fi

echo -e "${GREEN}Production build completed successfully!${NC}"
echo -e "${YELLOW}The build is ready in the 'dist' directory.${NC}"