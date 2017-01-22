import { CaffeMakerPage } from './app.po';

describe('caffe-maker App', function() {
  let page: CaffeMakerPage;

  beforeEach(() => {
    page = new CaffeMakerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
