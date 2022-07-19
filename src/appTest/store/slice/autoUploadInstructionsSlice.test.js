import {
  getInstructionsPageList,
  getInstructionsDetailsPageList,
  getInstructionsTempList,
  getByInstruction,
  getInstructionsTemp,
  instructionDelete,
  instructionUpdate,
  instructionAdd,
  instructionDetailPriceAdd,
  instructionDetailPriceUpdate,
  instructionDetailExcelUpload,
  instructionDetailExcelTemplate,
  getTotal,
  instructionDetailCopy,
} from '../../../store/slice/autoUploadInstructionsSlice';
import { store } from '../../../store/store';

describe('AutoUploadInstructions slice tests', () => {
  it('getInstructionsPageList call', () => {
    store.dispatch(getInstructionsPageList());
  });

  it('getInstructionsDetailsPageList call', () => {
    store.dispatch(getInstructionsDetailsPageList());
  });

  it('getInstructionsTempList call', () => {
    store.dispatch(getInstructionsTempList());
  });

  it('getByInstruction call', () => {
    store.dispatch(getByInstruction());
  });

  it('getInstructionsTemp call', () => {
    store.dispatch(getInstructionsTemp());
  });

  it('instructionDelete call', () => {
    store.dispatch(instructionDelete());
  });

  it('instructionUpdate call', () => {
    store.dispatch(instructionUpdate());
  });

  it('instructionAdd call', () => {
    store.dispatch(instructionAdd());
  });

  it('instructionDetailPriceAdd call', () => {
    store.dispatch(instructionDetailPriceAdd());
  });

  it('instructionDetailPriceUpdate call', () => {
    store.dispatch(instructionDetailPriceUpdate());
  });

  it('instructionDetailExcelUpload call', () => {
    store.dispatch(instructionDetailExcelUpload());
  });

  it('instructionDetailExcelTemplate call', () => {
    store.dispatch(instructionDetailExcelTemplate());
  });

  it('getTotal call', () => {
    store.dispatch(getTotal());
  });

  it('instructionDetailCopy call', () => {
    store.dispatch(instructionDetailCopy());
  });
});
