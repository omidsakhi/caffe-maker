import { Injectable } from '@angular/core';
import { NodeDescriptor } from './node-descriptor';
import * as lp from './layer-parameter';

@Injectable()
export class RepositoryService {

  public nodes: NodeDescriptor[] = [];

  constructor() {
    //this.nodes.push(new NodeDescriptor(''));
    this.nodes.push(new NodeDescriptor('AbsVal', 'Computes absolute value', new lp.LayerParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Accuracy', 'Computes the classification accuracy for a one-of-many classification task.', new lp.AccuracyParameter, 2, -1, -1, -1, 1, 2));
    this.nodes.push(new NodeDescriptor('ArgMax', 'Compute the index of the max values for each datum across all dimensions', new lp.ArgMaxParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('BatchNorm', 'Normalizes the input to have 0-mean and/or unit (1) variance across the batch.', new lp.BatchNormParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('BatchReindex', "To select, reorder or replicate examples in a batch.", new lp.LayerParameter, 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Bias', 'Computes a sum of two input Blobs, with the shape of the latter Blob "broadcast" to match the shape of the former. Equivalent to tiling the latter Blob, then computing the elementwise sum.', new lp.BiasParameter, -1, 1, 2, 1));
    this.nodes.push(new NodeDescriptor('Concat', 'Concatenates blobs along either the num or channel dimension, outputting the result.', new lp.ConcatParameter, -1, 1, -1, 1));
    this.nodes.push(new NodeDescriptor('ContrastiveLoss', 'Computes the contrastive loss', new lp.ContrastiveLossParameter, 3, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Convolution', 'Convolves the input image with a bank of learned filters, and (optionally) adds biases.', new lp.ConvolutionParameter, -1, 1, -1, -1, 1, -1, true));
    this.nodes.push(new NodeDescriptor('Crop', 'Takes a Blob and crop it, to the shape specified by the second input Blob, across all dimensions after the specified axis.', new lp.CropParameter, 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Dropout', 'During training only, sets a random portion of data to 0, adjusting the rest of the vector magnitude accordingly.', new lp.DropoutParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Eltwise', 'Compute elementwise operations, such as product and sum, along multiple input Blobs.', new lp.EltwiseParameter, -1, 2, -1, 1));
    this.nodes.push(new NodeDescriptor('ELU', 'Exponential Linear Unit non-linearity', new lp.ELUParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('EuclideanLoss', 'Computes the Euclidean (L2) loss', new lp.LayerParameter, 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Exp', '', new lp.ExpParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Filter', '', new lp.LayerParameter, -1, 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Flatten', 'Reshapes the input Blob into flat vectors.', new lp.FlattenParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('HDF5Data', 'Provides data to the Net from HDF5 files.', new lp.HDF5DataParameter, 0, -1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('HDF5Output', 'Write blobs to disk as HDF5 files.', new lp.HDF5OutputParameter, 2, -1, -1, 0));
    this.nodes.push(new NodeDescriptor('HingeLoss', 'Computes the hinge loss for a one-of-many classification task.', new lp.LayerParameter, 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Im2col', 'Rearranges image regions into column vectors.', new lp.LayerParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('ImageData', 'Provides data to the Net from image files.', new lp.LayerParameter, 0, -1, -1, 2));
    this.nodes.push(new NodeDescriptor('InfogainLoss', 'takes an information gain (infogain) matrix specifying the value of all label pairs.', new lp.InfogainLossParameter, -1, 2, 3));
    this.nodes.push(new NodeDescriptor('InnerProduct', 'Also known as a "fully-connected" layer, computes an inner product with a set of learned weights, and (optionally) adds biases.', new lp.InnerProductParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Input', 'Provides data to the Net by assigning tops directly.', new lp.InputParameter, 0, -1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Log', 'Computes Log', new lp.LogParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('LRN', 'Normalize the input in a local region across or within feature maps.', new lp.LRNParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('LSTMUnit', 'Long Short-Term Memory', new lp.RecurrentParameter, 3, -1, -1, 2));
    this.nodes.push(new NodeDescriptor('MemoryData', 'Provides data to the Net from memory.', new lp.MemoryDataParameter, 0, -1, -1, 2));
    this.nodes.push(new NodeDescriptor('MultinomialLogisticLoss', '', new lp.LayerParameter, 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('MVN', 'Normalizes the input to have 0-mean and/or unit (1) variance.', new lp.MVNParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Pooling', 'Pools the input image by taking the max, average, etc. within regions.', new lp.PoolingParameter, 1, -1, -1, -1, 1, 2));
    this.nodes.push(new NodeDescriptor('Power', '', new lp.PowerParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('PReLU', 'Parameterized Rectified Linear Unit non-linearity', new lp.PReLUParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Reduction', 'Compute "reductions"', new lp.ReductionParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('ReLU', 'Rectified Linear Unit non-linearity', new lp.ReLUParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Reshape', 'Reshapes the input Blob into an arbitrary-sized output Blob.', new lp.ReshapeParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Scale', 'Computes the elementwise product of two input Blobs, with the shape of the latter Blob "broadcast" to match the shape of the former.', new lp.ScaleParameter, -1, 1, 2, 1));
    this.nodes.push(new NodeDescriptor('SigmoidCrossEntropyLoss', '', new lp.LayerParameter, 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Sigmoid', '', new lp.SigmoidParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Silence', '', new lp.LayerParameter, -1, 1, -1, 0));
    this.nodes.push(new NodeDescriptor('Slice', '', new lp.SliceParameter, 1, -1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Softmax', '', new lp.SoftmaxParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('SoftmaxWithLoss', '', new lp.LayerParameter, -1, 1, 2));
    this.nodes.push(new NodeDescriptor('Split', '', new lp.LayerParameter, 1, -1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('TanH', '', new lp.TanHParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Threshold', '', new lp.ThresholdParameter, 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Tile', '', new lp.TileParameter, 1, -1, -1, 1));

    //TODO : Add more

    this.assignIndex();
  }

  assignIndex() {
    for (var i = 0; i < this.nodes.length; ++i)
      this.nodes[i].id = i;
  }

  fintDescriptorById(id: number): NodeDescriptor {
    for (let desc of this.nodes)
      if (desc.id == id)
        return desc;
    return null;
  }
}
