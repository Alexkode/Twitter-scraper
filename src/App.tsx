import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { SearchForm } from './components/SearchForm';
import { TweetCard } from './components/TweetCard';
import { Twitter } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Tweet {
  username: string;
  content: string;
  timestamp: string;
}

function App() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (username: string, count: number) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, count }),
      });

      if (!response.ok) throw new Error('Failed to fetch tweets');

      const data = await response.json();
      const formattedTweets = data.tweets.map((tweet: any) => ({
        username: tweet.user.username,
        content: tweet.text,
        timestamp: new Date().toISOString(),
      }));

      setTweets(formattedTweets);

      // Store in Firebase
      for (const tweet of formattedTweets) {
        await addDoc(collection(db, 'tweets'), tweet);
      }

      toast.success(`Successfully fetched ${formattedTweets.length} tweets!`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch tweets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Twitter className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Twitter Scraper</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {tweets.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tweets.map((tweet, index) => (
              <TweetCard
                key={index}
                username={tweet.username}
                content={tweet.content}
                timestamp={tweet.timestamp}
              />
            ))}
          </div>
        )}

        {!isLoading && tweets.length === 0 && (
          <div className="mt-12 text-center text-gray-500">
            <Twitter className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Enter a Twitter username to fetch tweets</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;