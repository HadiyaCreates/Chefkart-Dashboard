import { useEffect, useState } from 'react';

function PrivacyPolicy() {
  const [privacyData, setPrivacyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      const token = localStorage.getItem('token');  // Get the token from localStorage
      if (!token) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/super-admin/utility/privacy`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Add the token in the Authorization header
          },
        });

        const data = await response.json();
        if (response.ok) {
          setPrivacyData(data.data);  // Set the fetched privacy data
        } else {
          setError(data.message || 'Failed to fetch privacy policy');
        }
      } catch (err) {
        setError('Error fetching privacy policy');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold text-primary py-8">Loading Privacy Policy...</div>;
  }

  if (error) {
    return <div className="text-center text-lg font-semibold text-red-600 py-8">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">Privacy Policy</h2>
        {/* Render the HTML content */}
        <div
          className="prose prose-lg text-gray-700"
          dangerouslySetInnerHTML={{
            __html: privacyData ? privacyData.content : 'No content available',
          }}
        />
      </div>
    </div>
  );
}

export default PrivacyPolicy;
