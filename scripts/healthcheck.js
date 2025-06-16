#!/usr/bin/env node

/**
 * Health check script for the Harper AI website
 * This script verifies that the build output is valid and ready for deployment
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const REQUIRED_FILES = [
  'index.html',
  // Add other critical files here
];

const REQUIRED_DIRS = [
  // Add required directories here, e.g., 'assets', 'images'
];

function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch (error) {
    return false;
  }
}

function checkDirExists(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (error) {
    return false;
  }
}

function runHealthCheck() {
  console.log('Running health check for Harper AI website build...\n');

  let allChecksPass = true;

  // Check if dist directory exists
  if (!checkDirExists(DIST_DIR)) {
    console.error('❌ Build directory (dist) not found!');
    return false;
  }
  console.log('✅ Build directory exists');

  // Check required files
  console.log('\nChecking required files...');
  for (const file of REQUIRED_FILES) {
    const filePath = path.join(DIST_DIR, file);
    if (checkFileExists(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.error(`❌ ${file} not found!`);
      allChecksPass = false;
    }
  }

  // Check required directories
  if (REQUIRED_DIRS.length > 0) {
    console.log('\nChecking required directories...');
    for (const dir of REQUIRED_DIRS) {
      const dirPath = path.join(DIST_DIR, dir);
      if (checkDirExists(dirPath)) {
        console.log(`✅ ${dir}/`);
      } else {
        console.error(`❌ ${dir}/ not found!`);
        allChecksPass = false;
      }
    }
  }

  // Check index.html content
  console.log('\nChecking index.html content...');
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (checkFileExists(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    if (content.includes('<!DOCTYPE html>') && content.includes('</html>')) {
      console.log('✅ index.html appears valid');
    } else {
      console.error('❌ index.html content appears invalid');
      allChecksPass = false;
    }
  }

  // Check build size
  console.log('\nChecking build size...');
  const getDirSize = (dirPath) => {
    let size = 0;
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        size += getDirSize(filePath);
      } else {
        size += stat.size;
      }
    }
    
    return size;
  };

  const totalSize = getDirSize(DIST_DIR);
  const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
  console.log(`✅ Total build size: ${sizeMB} MB`);

  if (totalSize === 0) {
    console.error('❌ Build directory is empty!');
    allChecksPass = false;
  }

  // Final result
  console.log('\n' + '='.repeat(50));
  if (allChecksPass) {
    console.log('✅ All health checks passed! Build is ready for deployment.');
    process.exit(0);
  } else {
    console.error('❌ Some health checks failed. Please fix the issues before deployment.');
    process.exit(1);
  }
}

// Run the health check
runHealthCheck();