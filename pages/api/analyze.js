// pages/api/analyze.js
import { create, load } from '@tensorflow-models/universal-sentence-encoder';
import toxicity from '@tensorflow-models/toxicity';

export default async function handler(req, res) {
  const { urls } = req.body;
  const videoUrls = urls.split('\n').filter((url) => url.trim() !== '');

  try {
    const [model, sentences] = await Promise.all([
      toxicity.load(),
      load(),
    ]);

    const results = await Promise.all(
      videoUrls.map(async (url) => {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${url}&key=YOUR_YOUTUBE_API_KEY`);
        const data = await response.json();
        const videoTitle = data.items[0].snippet.title;

        // You need to implement the logic to fetch YouTube comments based on the video URL
        const comments = await getYouTubeComments(url);

        const sentiments = await model.classify(comments.map((comment) => comment.text));
        const sentenceEmbeddings = await sentences.embed(comments.map((comment) => comment.text));

        const positiveComments = sentiments.filter((sentiment) => sentiment.label === 'positive').length;
        const neutralComments = sentiments.filter((sentiment) => sentiment.label === 'neutral').length;
        const negativeComments = sentiments.filter((sentiment) => sentiment.label === 'negative').length;

        const totalComments = comments.length;

        return {
          url,
          videoTitle,
          totalComments,
          positiveComments,
          neutralComments,
          negativeComments,
        };
      })
    );

    res.status(200).json(results);
  } catch (error) {
    console.error('Error during analysis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
