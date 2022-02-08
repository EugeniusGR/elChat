import fetch from 'node-fetch';

const BASE_URL = 'localhost:3000';

const getAllMessages = async (conversationId) => {
  await fetch(`${BASE_URL}/get-all-message`, {
    method: 'POST',
    body: { conversationId },
  });
};

export { getAllMessages };
