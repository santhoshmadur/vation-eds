export default function decorate(block) {
  const url = 'https://edge-sandbox-graph.adobe.io/api/f59543c5-4f81-4114-b07f-cafe8c3df8b1/graphql?query=%7B%0A++getProduct%28id%3A+%2201tf6000002tDujAAE%22%29+%0A%7D';

  block.innerHTML = `
    <div>testing api response</div>
    <pre>Loading...</pre>
  `;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pre = document.createElement('pre');
      pre.textContent = JSON.stringify(data, null, 2);

      block.innerHTML = '<div>testing api response</div>';
      block.appendChild(pre);
    })
    .catch((error) => {
      console.error('Error:', error);
      block.innerHTML = `
        <div>testing api response</div>
        <pre>Failed to load data</pre>
      `;
    });
}
