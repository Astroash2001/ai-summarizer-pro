"""
Text extraction utilities for different file formats.

This module handles extracting text from PDF and TXT files safely.
"""
import logging
from typing import Tuple
from pypdf import PdfReader
from io import BytesIO

logger = logging.getLogger(__name__)


def extract_text_from_pdf(file) -> Tuple[str, str]:
    """
    Extract text from a PDF file using pypdf.
    
    Args:
        file: Django UploadedFile object containing a PDF
        
    Returns:
        Tuple of (extracted_text, error_message)
        If successful, error_message will be None
        If failed, extracted_text will be empty string
    """
    try:
        # Read file content into BytesIO for pypdf
        pdf_content = BytesIO(file.read())
        
        # Create PDF reader
        reader = PdfReader(pdf_content)
        
        # Check if PDF has pages
        if len(reader.pages) == 0:
            return "", "PDF file contains no pages"
        
        # Extract text from all pages
        text_content = []
        for page_num, page in enumerate(reader.pages):
            try:
                page_text = page.extract_text()
                if page_text.strip():  # Only add non-empty pages
                    text_content.append(page_text)
            except Exception as page_error:
                logger.warning(f"Failed to extract text from page {page_num + 1}: {str(page_error)}")
                continue
        
        # Combine all page texts
        full_text = "\n\n".join(text_content)
        
        # Check if we got any text
        if not full_text.strip():
            return "", "Could not extract text from PDF. The file might be image-based or encrypted."
        
        return full_text, None
        
    except Exception as e:
        logger.error(f"PDF extraction error: {str(e)}")
        return "", f"Failed to process PDF file: {str(e)}"


def extract_text_from_txt(file) -> Tuple[str, str]:
    """
    Extract text from a TXT file.
    
    Args:
        file: Django UploadedFile object containing a text file
        
    Returns:
        Tuple of (extracted_text, error_message)
        If successful, error_message will be None
        If failed, extracted_text will be empty string
    """
    try:
        # Try UTF-8 first, fall back to latin-1 if that fails
        try:
            text = file.read().decode('utf-8')
        except UnicodeDecodeError:
            file.seek(0)  # Reset file pointer
            text = file.read().decode('latin-1')
        
        # Check if text is empty
        if not text.strip():
            return "", "Text file is empty"
        
        return text, None
        
    except Exception as e:
        logger.error(f"TXT extraction error: {str(e)}")
        return "", f"Failed to process text file: {str(e)}"


def extract_text_from_file(file) -> Tuple[str, str]:
    """
    Main extraction function that routes to appropriate handler based on file type.
    
    Args:
        file: Django UploadedFile object
        
    Returns:
        Tuple of (extracted_text, error_message)
    """
    # Get file extension
    file_extension = file.name.split('.')[-1].lower()
    
    # Route to appropriate extractor
    if file_extension == 'pdf':
        return extract_text_from_pdf(file)
    elif file_extension == 'txt':
        return extract_text_from_txt(file)
    else:
        return "", f"Unsupported file type: {file_extension}"
