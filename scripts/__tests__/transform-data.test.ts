import { transformWithData } from '../transform-data';

test('it outputs the same JSON each time', () => {
  const result = transformWithData();

  expect(result).toMatchSnapshot();
});
