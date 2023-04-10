import { useState } from 'react';
import { Alert } from 'react-native';

const useGenerateDiet = () => {
  const [loading, setLoading] = useState(false);
  const CHAT_GPD_API_KEY = '';

  function handleFetchTags() {
    setLoading(true);

    const prompt = `
      Generate keywords in Portuguese for a post about gym.
      Replace the spaces in each word with the character "_".
      Return each item separated by a comma, in lowercase, and without a line break.
    `;

    fetch(
      'https://api.openai.com/v1/engines/text-davinci-003-playground/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CHAT_GPD_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.22,
          max_tokens: 500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      },
    )
      .then(response => response.json())
      .catch(() => Alert.alert('Erro', 'Não foi possível buscar as tags.'))
      .finally(() => setLoading(false));
  }

  return { handleFetchTags, loading };
};

export default useGenerateDiet;
