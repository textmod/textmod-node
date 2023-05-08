import axios from 'axios';
import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';

export type Sentiment =
  | 'spam'
  | 'self-promoting'
  | 'hate'
  | 'terrorism'
  | 'extremism'
  | 'pornographic'
  | 'threatening'
  | 'self-harm'
  | 'sexual'
  | 'sexual/minors'
  | 'violence'
  | 'violence/graphic';

type TextModApiRequestBody = {
  content: string;
};

type TextModSentiments = {
  [sentiment: string]: boolean;
};

type ModerationResult = {
  [sentiment: string]: boolean;
};

type TextModConfig = {
  authToken: string;
  filterSentiments?: Sentiment[];
};

export class TextMod {
  private static readonly baseUrl = 'https://api.textmod.xyz';

  private readonly authToken: string;
  private readonly allowedSentiments: Sentiment[];

  constructor(config: TextModConfig) {
    this.authToken = config.authToken;
    this.allowedSentiments = config.filterSentiments ?? [
      'spam',
      'self-promoting',
      'hate',
      'terrorism',
      'extremism',
      'self-harm',
    ];
  }

  async moderate(text: string): Promise<ModerationResult> {
    const sentiments = this.getSentimentsParameters(this.allowedSentiments);
    const requestBody: TextModApiRequestBody = { content: text };
    const response = await axios.post<TextModSentiments>(
      `${TextMod.baseUrl}/api/text/mod${sentiments}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`,
        },
      }
    );
    const result: ModerationResult = {};
    for (const [sentiment, value] of Object.entries(response.data)) {
      result[camelCase(sentiment)] = value as boolean;
    }
    return result;
  }

  private getSentimentsParameters(sentiments: Sentiment[]): string {
    const allSentiments = [
      'spam',
      'self-promoting',
      'hate',
      'terrorism',
      'extremism',
      'pornographic',
      'threatening',
      'self-harm',
      'sexual',
      'sexual/minors',
      'violence',
      'violence/graphic',
    ];
    const allowedSentiments = sentiments.filter(sentiment => allSentiments.includes(sentiment));
    const kebabCaseSentiments = allowedSentiments.map(sentiment => kebabCase(sentiment));
    return kebabCaseSentiments.length > 0
      ? `?sentiments[]=${kebabCaseSentiments.join('&sentiments[]=')}`
      : '';
  }
}
