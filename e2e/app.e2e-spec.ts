import { LangalizePage } from './app.po';

describe('langalize App', function() {
  let page: LangalizePage;

  beforeEach(() => {
    page = new LangalizePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
