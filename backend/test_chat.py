"""
Test the new chat endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_extract_text():
    """Test text extraction"""
    print("Testing text extraction endpoint...")
    
    # Create a simple text file
    with open("test_chat.txt", "w") as f:
        f.write("This is a test document about AI and machine learning. AI is transforming many industries.")
    
    with open("test_chat.txt", "rb") as f:
        files = {"file": ("test_chat.txt", f, "text/plain")}
        response = requests.post(f"{BASE_URL}/extract-text/", files=files)
    
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Response: {json.dumps(data, indent=2)}")
    
    return data.get("text", "")

def test_chat(context):
    """Test chat endpoint"""
    print("\nTesting chat endpoint...")
    
    payload = {
        "question": "What is this document about?",
        "context": context
    }
    
    response = requests.post(
        f"{BASE_URL}/chat-document/",
        json=payload,
        headers={"Content-Type": "application/json"}
    )
    
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Response: {json.dumps(data, indent=2)}")

if __name__ == "__main__":
    try:
        # Test text extraction
        extracted_text = test_extract_text()
        
        if extracted_text:
            # Test chat
            test_chat(extracted_text)
        
        print("\n✅ All tests completed!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to backend. Make sure Django server is running on port 8000")
    except Exception as e:
        print(f"❌ Error: {e}")
