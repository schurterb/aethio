
class AIConnector {
    constructor(api_key, opts={}) {
      if(api_key) this.api_key = api_key;
      else console.log('[AIConnector] ERROR : API KEY is requiered!')
      opts = opts || {};
      this.model_id = opts.model_id || 'code-davinci-002';
      this.max_tokens = opts.max_tokens || 150;
      this.temperature = opts.temperature || 0.3;
      this.top_p = opts.top_p || 3;
      this.frequency_penalty = opts.frequency_penalty || 0.0;
      this.presence_penalty = opts.presence_penalty || 0.0;
    }

    sendRequest(message, context, callback) {
      if(context && typeof(context) === 'string') {
        message = context+"\n"+message;
      }
      fetch(`https://api.openai.com/v1/models/${this.model_id}/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.api_key}`
        },
        body: JSON.stringify({
          prompt: message,
          max_tokens: this.max_tokens,
          temperature: this.temperature,
          top_p: this.top_p,
          frequency_penalty: this.frequency_penalty,
          presence_penalty: this.presence_penalty,
        })
      }).then(
        response => response.json()
      ).then(
        json => callback(json)
      ).catch(
        error => console.error(error)
      );
    }
}
