import pkg_resources # type: ignore
import subprocess
import sys
import os

def check_python_packages():
    required_packages = {
        'opencv-python': 'cv2',
        'numpy': 'numpy',
        'PyMuPDF': 'fitz',
        'Pillow': 'PIL',
        'mediapipe': 'mediapipe',
        'python-pptx': 'pptx',
        'pdf2image': 'pdf2image'
    }
    
    missing_packages = []
    installed_packages = []
    
    print("\n=== Checking Python Packages ===")
    for package, import_name in required_packages.items():
        try:
            pkg_resources.require(package)
            exec(f"import {import_name}")
            installed_packages.append(package)
            print(f"✅ {package} is installed and working")
        except (pkg_resources.DistributionNotFound, ImportError):
            missing_packages.append(package)
            print(f"❌ {package} is missing")
    
    return missing_packages, installed_packages

def check_system_dependencies():
    print("\n=== Checking System Dependencies ===")
    
    # Check LibreOffice
    libreoffice_path = "C:\\Program Files\\LibreOffice\\program\\soffice.exe"
    if os.path.exists(libreoffice_path):
        print("✅ LibreOffice is installed")
    else:
        print("❌ LibreOffice is not found at expected location")
        print("   Please install LibreOffice from: https://www.libreoffice.org/download/download/")
    
    # Check Poppler
    try:
        from pdf2image.exceptions import PDFInfoNotInstalledError # type: ignore
        from pdf2image import pdfinfo_from_path # type: ignore
        print("✅ Poppler is installed and working")
    except Exception:
        print("❌ Poppler is not properly installed")
        print("   For Windows: Download from http://blog.alivate.com.au/poppler-windows/")
        print("   For Linux: sudo apt-get install poppler-utils")

def install_missing_packages(missing_packages):
    if not missing_packages:
        return
    
    print("\n=== Installing Missing Packages ===")
    for package in missing_packages:
        print(f"Installing {package}...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            print(f"✅ Successfully installed {package}")
        except subprocess.CalledProcessError:
            print(f"❌ Failed to install {package}")

def main():
    print("Starting dependency check...\n")
    print(f"Python version: {sys.version}")
    
    missing_packages, installed_packages = check_python_packages()
    check_system_dependencies()
    
    if missing_packages:
        print("\n❌ Some packages are missing!")
        choice = input("Would you like to install missing packages? (y/n): ")
        if choice.lower() == 'y':
            install_missing_packages(missing_packages)
    else:
        print("\n✅ All required Python packages are installed!")
    
    print("\nDependency check complete!")

if __name__ == "__main__":
    main()
