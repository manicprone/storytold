import chai from 'chai';
import ContentUtils from '../../../src/utils/content-utils';

const expect = chai.expect;

describe('content-utils', () => {
  // -----------------------------------
  // Testing: generateTagKeyFromLabel...
  // -----------------------------------
  describe('generateTagKeyFromLabel', () => {
    it('should return null if no value is provided', () => {
      const key = ContentUtils.generateTagKeyFromLabel();

      expect(key).to.be.null;
    });

    it('should trim whitespace from ends and lower-case the label', () => {
      const label = '  AbCdEFghiJKlMNoPqrstUVwXyZ     ';
      const key = ContentUtils.generateTagKeyFromLabel(label);

      expect(key).to.equal('abcdefghijklmnopqrstuvwxyz');
    });

    it('should prepend "num-" to the label if a number', () => {
      const label = '  12345     ';
      const key = ContentUtils.generateTagKeyFromLabel(label);

      expect(key).to.equal('num-12345');
    });

    it('should deburr diacritical marks', () => {
      const label = 'Déjà ô ñöç';
      const key = ContentUtils.generateTagKeyFromLabel(label);

      expect(key).to.equal('deja-o-noc');
    });

    it('should trim common ASCII punctuation from ends', () => {
      const label = '`~!@#$%^&*()_-{}[]|\\:;"\',?/%AbCdEFghiJKlMNoPqrstUVwXyZ`~!@#$%^&*()_-{}[]|\\:;"\',?/%';
      const key = ContentUtils.generateTagKeyFromLabel(label);

      expect(key).to.equal('abcdefghijklmnopqrstuvwxyz');
    });

    it('should trim common Chinese punctuation from ends', () => {
      const label = '，！？；：（ ）［］【 】。「」﹁﹂“…‘’”AbCdEFghiJKlMNoPqrstUVwXyZ，！？；：（ ）［］【 】。「」﹁﹂“…‘’”';
      const key = ContentUtils.generateTagKeyFromLabel(label);

      expect(key).to.equal('abcdefghijklmnopqrstuvwxyz');
    });

    it('should strip common ASCII punctuation within the label', () => {
      const label = 'start`~!@#$%^&*()_-{}[]|\\:;"\',?/%end';
      const key = ContentUtils.generateTagKeyFromLabel(label);

      expect(key).to.equal('start-end');
      expect(ContentUtils.generateTagKeyFromLabel('toys   \'r\' Us')).to.equal('toys-r-us');
    });

    it('should strip common Chinese punctuation within the label', () => {
      const labelForIndex = 'start，！？；：（ ）［］【 】。「」﹁﹂“‘’”‧…《》〈〉﹏—～end';
      const labelForRepeating =
        'start，，！！！？？？；：：：！！（ ）））：：］］［］］］【【【 】。「」﹁﹁﹁﹁﹁﹂“…………‘’’’”‧‧‧end';
      const keyForIndex = ContentUtils.generateTagKeyFromLabel(labelForIndex);
      const keyForRepeating = ContentUtils.generateTagKeyFromLabel(labelForRepeating);

      expect(keyForIndex).to.equal('start-end');
      expect(keyForRepeating).to.equal('start-end');
    });

    it('should replace (.) with "dot"', () => {
      const label = '.com';
      const key = ContentUtils.generateTagKeyFromLabel(label);

      expect(key).to.equal('dot-com');
    });

    it('should replace (<) (>) (=) with semantic phrases', () => {
      const labelLT = 'I < You';
      const labelRepeatingLT = 'I <<<<<<< You';
      const labelGT = 'I > You';
      const labelEQ = 'I = You';
      const labelRepeatingEQ = 'I === You';
      const labelWithPlus = '2+2=4';
      const keyLT = ContentUtils.generateTagKeyFromLabel(labelLT);
      const keyRepeatingLT = ContentUtils.generateTagKeyFromLabel(labelRepeatingLT);
      const keyGT = ContentUtils.generateTagKeyFromLabel(labelGT);
      const keyEQ = ContentUtils.generateTagKeyFromLabel(labelEQ);
      const keyRepeatingEQ = ContentUtils.generateTagKeyFromLabel(labelRepeatingEQ);
      const keyWithPlus = ContentUtils.generateTagKeyFromLabel(labelWithPlus);

      expect(keyLT).to.equal('i-less-than-you');
      expect(keyRepeatingLT).to.equal('i-less-than-you');
      expect(keyGT).to.equal('i-greater-than-you');
      expect(keyEQ).to.equal('i-equals-you');
      expect(keyRepeatingEQ).to.equal('i-equals-you');
      expect(keyWithPlus).to.equal('2-plus-2-equals-4');
    });

    it('should normalize common semantic patterns', () => {
      const labels = [
        'burgers fries',
        'burgers      fries',
        'burgers and fries',
        'burgers, and fries',
        'burgers AND   fries',
        'burgers & fries',
      ];

      labels.forEach((label) => {
        const key = ContentUtils.generateTagKeyFromLabel(label);
        expect(key).to.equal('burgers-fries');
      });
    });

    it('should replace 1-to-many repeating characters "," with a hyphen (-)', () => {
      const label = 'yo,yo,,,,,yo\\yo&&&&yo';
      const key = ContentUtils.generateTagKeyFromLabel(label);

      expect(key).to.equal('yo-yo-yo-yo-yo');
    });

    it('should handle mixed Chinese character strings as expected', () => {
      const label01 = 'CPLD/FPGA';
      const label02 = '单片机';
      const label03 = '3g与手机';
      const label04 = '99a999a工业控制';
      const label05 = '64-bit电源';
      const key01 = ContentUtils.generateTagKeyFromLabel(label01);
      const key02 = ContentUtils.generateTagKeyFromLabel(label02);
      const key03 = ContentUtils.generateTagKeyFromLabel(label03);
      const key04 = ContentUtils.generateTagKeyFromLabel(label04);
      const key05 = ContentUtils.generateTagKeyFromLabel(label05);

      expect(key01).to.equal('cpld-fpga');
      expect(key02).to.equal('单片机');
      expect(key03).to.equal('3-g与手机');
      expect(key04).to.equal('99-a-999-a工业控制');
      expect(key05).to.equal('64-bit电源');
    });
  }); // end-generateTagKeyFromLabel
});
