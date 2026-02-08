"""
AI summarization utilities using OpenAI API.

This module handles communication with the AI model for text summarization.
"""
import logging
from typing import Tuple
from openai import OpenAI
from django.conf import settings

logger = logging.getLogger(__name__)


class AISummarizer:
    """
    Wrapper class for AI-powered text summarization using OpenAI API.
    """
    
    def __init__(self):
        """Initialize OpenAI client with API key from settings."""
        self.api_key = settings.OPENAI_API_KEY
        if not self.api_key:
            logger.warning("OpenAI API key not configured")
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None
        self.model = settings.OPENAI_MODEL
        self.max_tokens = settings.OPENAI_MAX_TOKENS
        self.temperature = settings.OPENAI_TEMPERATURE
    
    def _truncate_text(self, text: str, max_chars: int = 12000) -> str:
        """
        Truncate text to fit within token limits.
        Using rough estimate of 1 token ≈ 4 characters.
        
        Args:
            text: Input text to truncate
            max_chars: Maximum characters to keep
            
        Returns:
            Truncated text
        """
        if len(text) <= max_chars:
            return text
        
        logger.warning(f"Text truncated from {len(text)} to {max_chars} characters")
        return text[:max_chars] + "\n\n[Text truncated due to length...]"
    
    def summarize(self, text: str) -> Tuple[str, str]:
        """
        Generate a summary of the provided text using AI.
        
        Args:
            text: The text content to summarize
            
        Returns:
            Tuple of (summary, error_message)
            If successful, error_message will be None
            If failed, summary will be empty string
        """
        # Check if API key is configured
        if not self.client:
            return "", "AI summarization is not configured. Please add OPENAI_API_KEY to environment."
        
        # Check if text is empty
        if not text.strip():
            return "", "No text provided for summarization"
        
        try:
            # Truncate text if too long
            truncated_text = self._truncate_text(text)
            
            # Create prompt for summarization
            prompt = f"""Summarize this document clearly and concisely. Focus on the main ideas and key points:

{truncated_text}"""
            
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that creates clear, concise summaries of documents. Focus on extracting the most important information."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature,
            )
            
            # Extract summary from response
            summary = response.choices[0].message.content.strip()
            
            if not summary:
                return "", "AI returned an empty summary"
            
            return summary, None
            
        except Exception as e:
            error_message = str(e)
            logger.error(f"AI summarization error: {error_message}")
            
            # Provide user-friendly error messages
            if "api_key" in error_message.lower():
                return "", "Invalid or missing API key"
            elif "quota" in error_message.lower() or "rate_limit" in error_message.lower():
                return "", "API rate limit exceeded. Please try again later."
            elif "timeout" in error_message.lower():
                return "", "Request timed out. Please try again."
            else:
                return "", f"AI summarization failed: {error_message}"


# Create a singleton instance
ai_summarizer = AISummarizer()


def summarize_text(text: str) -> Tuple[str, str]:
    """
    Convenience function to summarize text using the default AI summarizer.
    
    Args:
        text: Text content to summarize
        
    Returns:
        Tuple of (summary, error_message)
    """
    return ai_summarizer.summarize(text)
