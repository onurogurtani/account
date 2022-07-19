import autoUploadInstructionsServices from '../../services/autoUploadInstructions.services';

describe('AutoUploadInstructions services tests', () => {
  it('getInstructionsList call', () => {
    autoUploadInstructionsServices.getInstructionsList({ data: {} });
  });

  it('getInstructionsTemp call', () => {
    autoUploadInstructionsServices.getInstructionsTemp();
  });

  it('instructionsDetailList call', () => {
    autoUploadInstructionsServices.instructionsDetailList({ data: {} });
  });

  it('instructionsTempList call', () => {
    autoUploadInstructionsServices.instructionsTempList({ data: {} });
  });

  it('getById call', () => {
    autoUploadInstructionsServices.getById();
  });

  it('getTotal call', () => {
    autoUploadInstructionsServices.getTotal();
  });

  it('getReport call', () => {
    autoUploadInstructionsServices.getReport({ customerId: 1, vouId: 1, id: 1 });
  });

  it('instructionDelete call', () => {
    autoUploadInstructionsServices.instructionDelete();
  });

  it('instructionUpdate call', () => {
    autoUploadInstructionsServices.instructionUpdate();
  });

  it('instructionAdd call', () => {
    autoUploadInstructionsServices.instructionAdd();
  });

  it('instructionDetailAdd call', () => {
    autoUploadInstructionsServices.instructionDetailAdd();
  });

  it('instructionExcelDownload call', () => {
    autoUploadInstructionsServices.instructionExcelDownload();
  });

  it('instructionExcelUpload call', () => {
    autoUploadInstructionsServices.instructionExcelUpload();
  });

  it('instructionDetailPriceUpdate call', () => {
    autoUploadInstructionsServices.instructionDetailPriceUpdate();
  });

  it('instructionDetailExcelTemplate call', () => {
    autoUploadInstructionsServices.instructionDetailExcelTemplate();
  });

  it('instructionDetailExcelUpload call', () => {
    autoUploadInstructionsServices.instructionDetailExcelUpload();
  });

  it('instructionDetailCopy call', () => {
    autoUploadInstructionsServices.instructionDetailCopy();
  });
});
