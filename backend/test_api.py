"""
Quick test script to verify the API is working.

This script tests the /api/summarize/ endpoint with a sample text file.
"""
import requests
import os


def test_api():
    """Test the summarization API endpoint."""
    
    # API endpoint
    url = "http://localhost:8000/api/summarize/"
    
    # Check if test file exists
    test_file_path = "test_document.txt"
    if not os.path.exists(test_file_path):
        print("❌ Test file not found:", test_file_path)
        return
    
    print("🧪 Testing AI Summarizer API...")
    print(f"📄 Using test file: {test_file_path}")
    print(f"🌐 Endpoint: {url}")
    print("-" * 50)
    
    # Make request
    try:
        with open(test_file_path, 'rb') as f:
            files = {'file': f}
            response = requests.post(url, files=files, timeout=30)
        
        print(f"📊 Status Code: {response.status_code}")
        print(f"📦 Response:")
        print("-" * 50)
        
        data = response.json()
        
        if response.status_code == 200 and data.get('status') == 'success':
            print("✅ SUCCESS!")
            print(f"\n📝 Summary:\n{data['summary']}")
        else:
            print("❌ FAILED!")
            print(f"Error: {data.get('error', 'Unknown error')}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Is the Django server running?")
        print("Run: python manage.py runserver")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
    
    print("-" * 50)


if __name__ == "__main__":
    test_api()
