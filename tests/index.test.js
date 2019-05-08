import pkg from '../package.json';

const testDist = process.env.LIB_DIR === 'dist';

describe('antd dist files', () => {
  // https://github.com/infini-design/infini-design/issues/1638
  // https://github.com/infini-design/infini-design/issues/1968
  it('exports modules correctly', () => {
    const antd = testDist ? require('../dist/antd') : require('../components'); // eslint-disable-line
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  // https://github.com/infini-design/infini-design/issues/1970
  // https://github.com/infini-design/infini-design/issues/1804
  if (testDist) {
    it('should have antd.version', () => {
      const antd = require('../dist/antd'); // eslint-disable-line
      expect(antd.version).toBe(pkg.version);
    });
  }
});