"""
URL patterns for the summarizer app.
"""
from django.urls import path
from .views import SummarizeDocumentView
from .chat_views import ExtractTextView, ChatWithDocumentView

app_name = 'summarizer'

urlpatterns = [
    path('summarize/', SummarizeDocumentView.as_view(), name='summarize'),
    path('extract-text/', ExtractTextView.as_view(), name='extract_text'),
    path('chat-document/', ChatWithDocumentView.as_view(), name='chat_document'),
]
