import { Injectable } from '@angular/core';
import { NodeDescriptor } from './node-descriptor';
import * as lp from './layer-parameter';

@Injectable()
export class NodeFactoryService {
  public nodes: string[] = ['Convolution', 'Dropout', 'EuclideanLoss', 'HDF5Data', 'HDF5Output', 'HingeLoss', 'InnerProduct', 'MemoryData', 'Pooling', 'ReLU', 'Sigmoid', 'Silence', 'Softmax', 'SoftmaxWithLoss', 'TanH', 'AbsVal', 'Accuracy', 'ArgMax', 'BatchNorm', 'Bias', 'Concat', 'ContrastiveLoss', 'Crop', 'Eltwise', 'ELU', 'Exp', 'Filter', 'Flatten',
    'Im2col', 'ImageData', 'InfogainLoss', 'Input', 'Log', 'LRN', 'LSTMUnit', 'MultinomialLogisticLoss', 'MVN',
    'Power', 'PReLU', 'Reduction', 'Reshape', 'Scale', 'SigmoidCrossEntropyLoss', 'Slice', 'Split', 'Threshold', 'Tile'];

  constructor() { }
  createNode(name: string): NodeDescriptor {
    switch (name) {
      case 'AbsVal':
        return new NodeDescriptor('AbsVal', 'Computes absolute value', new lp.LayerParameter, 1, -1, -1, 1);
      case 'Accuracy':
        return new NodeDescriptor('Accuracy', 'Computes the classification accuracy for a one-of-many classification task.', new lp.AccuracyParameter, 2, -1, -1, -1, 1, 2);
      case 'ArgMax':
        return new NodeDescriptor('ArgMax', 'Compute the index of the max values for each datum across all dimensions', new lp.ArgMaxParameter, 1, -1, -1, 1);
      case 'BatchNorm':
        return new NodeDescriptor('BatchNorm', 'Normalizes the input to have 0-mean and/or unit (1) variance across the batch.', new lp.BatchNormParameter, 1, -1, -1, 1);
      case 'BatchReindex':
        return new NodeDescriptor('BatchReindex', "To select, reorder or replicate examples in a batch.", new lp.LayerParameter, 2, -1, -1, 1);
      case 'Bias':
        return new NodeDescriptor('Bias', 'Computes a sum of two input Blobs, with the shape of the latter Blob "broadcast" to match the shape of the former. Equivalent to tiling the latter Blob, then computing the elementwise sum.', new lp.BiasParameter, -1, 1, 2, 1);
      case 'Concat':
        return new NodeDescriptor('Concat', 'Concatenates blobs along either the num or channel dimension, outputting the result.', new lp.ConcatParameter, -1, 1, -1, 1);
      case 'ContrastiveLoss':
        return new NodeDescriptor('ContrastiveLoss', 'Computes the contrastive loss', new lp.ContrastiveLossParameter, 3, -1, -1, 1);
      case 'Convolution':
        return new NodeDescriptor('Convolution', 'Convolves the input image with a bank of learned filters, and (optionally) adds biases.', new lp.ConvolutionParameter, -1, 1, -1, -1, 1, -1, true);
      case 'Crop':
        return new NodeDescriptor('Crop', 'Takes a Blob and crop it, to the shape specified by the second input Blob, across all dimensions after the specified axis.', new lp.CropParameter, 2, -1, -1, 1);
      case 'Dropout':
        return new NodeDescriptor('Dropout', 'During training only, sets a random portion of data to 0, adjusting the rest of the vector magnitude accordingly.', new lp.DropoutParameter, 1, -1, -1, 1);
      case 'Eltwise':
        return new NodeDescriptor('Eltwise', 'Compute elementwise operations, such as product and sum, along multiple input Blobs.', new lp.EltwiseParameter, -1, 2, -1, 1);
      case 'ELU':
        return new NodeDescriptor('ELU', 'Exponential Linear Unit non-linearity', new lp.ELUParameter, 1, -1, -1, 1);
      case 'EuclideanLoss':
        return new NodeDescriptor('EuclideanLoss', 'Computes the Euclidean (L2) loss', new lp.LayerParameter, 2, -1, -1, 1);
      case 'Exp':
        return new NodeDescriptor('Exp', '', new lp.ExpParameter, 1, -1, -1, 1);
      case 'Filter':
        return new NodeDescriptor('Filter', '', new lp.LayerParameter, -1, 2, -1, -1, 1);
      case 'Flatten':
        return new NodeDescriptor('Flatten', 'Reshapes the input Blob into flat vectors.', new lp.FlattenParameter, 1, -1, -1, 1);
      case 'HDF5Data':
        return new NodeDescriptor('HDF5Data', 'Provides data to the Net from HDF5 files.', new lp.HDF5DataParameter, 0, -1, -1, -1, 1);
      case 'HDF5Output':
        return new NodeDescriptor('HDF5Output', 'Write blobs to disk as HDF5 files.', new lp.HDF5OutputParameter, 2, -1, -1, 0);
      case 'HingeLoss':
        return new NodeDescriptor('HingeLoss', 'Computes the hinge loss for a one-of-many classification task.', new lp.LayerParameter, 2, -1, -1, 1);
      case 'Im2col':
        return new NodeDescriptor('Im2col', 'Rearranges image regions into column vectors.', new lp.LayerParameter, 1, -1, -1, 1);
      case 'ImageData':
        return new NodeDescriptor('ImageData', 'Provides data to the Net from image files.', new lp.LayerParameter, 0, -1, -1, 2);
      case 'InfogainLoss':
        return new NodeDescriptor('InfogainLoss', 'takes an information gain (infogain) matrix specifying the value of all label pairs.', new lp.InfogainLossParameter, -1, 2, 3);
      case 'InnerProduct':
        return new NodeDescriptor('InnerProduct', 'Also known as a "fully-connected" layer, computes an inner product with a set of learned weights, and (optionally) adds biases.', new lp.InnerProductParameter, 1, -1, -1, 1);
      case 'Input':
        return new NodeDescriptor('Input', 'Provides data to the Net by assigning tops directly.', new lp.InputParameter, 0, -1, -1, -1, 1);
      case 'Log':
        return new NodeDescriptor('Log', 'Computes Log', new lp.LogParameter, 1, -1, -1, 1);
      case 'LRN':
        return new NodeDescriptor('LRN', 'Normalize the input in a local region across or within feature maps.', new lp.LRNParameter, 1, -1, -1, 1);
      case 'LSTMUnit':
        return new NodeDescriptor('LSTMUnit', 'Long Short-Term Memory', new lp.RecurrentParameter, 3, -1, -1, 2);
      case 'MemoryData':
        return new NodeDescriptor('MemoryData', 'Provides data to the Net from memory.', new lp.MemoryDataParameter, 0, -1, -1, 2);
      case 'MultinomialLogisticLoss':
        return new NodeDescriptor('MultinomialLogisticLoss', '', new lp.LayerParameter, 2, -1, -1, 1);
      case 'MVN':
        return new NodeDescriptor('MVN', 'Normalizes the input to have 0-mean and/or unit (1) variance.', new lp.MVNParameter, 1, -1, -1, 1);
      case 'Pooling':
        return new NodeDescriptor('Pooling', 'Pools the input image by taking the max, average, etc. within regions.', new lp.PoolingParameter, 1, -1, -1, -1, 1, 2);
      case 'Power':
        return new NodeDescriptor('Power', '', new lp.PowerParameter, 1, -1, -1, 1);
      case 'PReLU':
        return new NodeDescriptor('PReLU', 'Parameterized Rectified Linear Unit non-linearity', new lp.PReLUParameter, 1, -1, -1, 1);
      case 'Reduction':
        return new NodeDescriptor('Reduction', 'Compute "reductions"', new lp.ReductionParameter, 1, -1, -1, 1);
      case 'ReLU':
        return new NodeDescriptor('ReLU', 'Rectified Linear Unit non-linearity', new lp.ReLUParameter, 1, -1, -1, 1);
      case 'Reshape':
        return new NodeDescriptor('Reshape', 'Reshapes the input Blob into an arbitrary-sized output Blob.', new lp.ReshapeParameter, 1, -1, -1, 1);
      case 'Scale':
        return new NodeDescriptor('Scale', 'Computes the elementwise product of two input Blobs, with the shape of the latter Blob "broadcast" to match the shape of the former.', new lp.ScaleParameter, -1, 1, 2, 1);
      case 'SigmoidCrossEntropyLoss':
        return new NodeDescriptor('SigmoidCrossEntropyLoss', '', new lp.LayerParameter, 2, -1, -1, 1);
      case 'Sigmoid':
        return new NodeDescriptor('Sigmoid', '', new lp.SigmoidParameter, 1, -1, -1, 1);
      case 'Silence':
        return new NodeDescriptor('Silence', '', new lp.LayerParameter, -1, 1, -1, 0);
      case 'Slice':
        return new NodeDescriptor('Slice', '', new lp.SliceParameter, 1, -1, -1, -1, 1);
      case 'Softmax':
        return new NodeDescriptor('Softmax', '', new lp.SoftmaxParameter, 1, -1, -1, 1);
      case 'SoftmaxWithLoss':
        return new NodeDescriptor('SoftmaxWithLoss', '', new lp.LayerParameter, -1, 1, 2);
      case 'Split':
        return new NodeDescriptor('Split', '', new lp.LayerParameter, 1, -1, -1, -1, 1);
      case 'TanH':
        return new NodeDescriptor('TanH', '', new lp.TanHParameter, 1, -1, -1, 1);
      case 'Threshold':
        return new NodeDescriptor('Threshold', '', new lp.ThresholdParameter, 1, -1, -1, 1);
      case 'Tile':
        return new NodeDescriptor('Tile', '', new lp.TileParameter, 1, -1, -1, 1);
      default:
        return null;
    }
  }
}