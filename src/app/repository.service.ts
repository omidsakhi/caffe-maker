import { Injectable } from '@angular/core';
import { NodeDescriptor } from './node-descriptor';

@Injectable()
export class RepositoryService {

  public nodes: NodeDescriptor[] = [];

  constructor() {
    //this.nodes.push(new NodeDescriptor(''));
    this.nodes.push(new NodeDescriptor('AbsVal', 'Computes absolute value', 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Accuracy', 'Computes the classification accuracy for a one-of-many classification task.', 2, -1, -1, -1, 1, 2));
    this.nodes.push(new NodeDescriptor('ArgMax', 'Compute the index of the max values for each datum across all dimensions', 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('BatchNorm', 'Normalizes the input to have 0-mean and/or unit (1) variance across the batch.', 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('BatchReindex', "To select, reorder or replicate examples in a batch.", 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Bias', 'Computes a sum of two input Blobs, with the shape of the latter Blob "broadcast" to match the shape of the former. Equivalent to tiling the latter Blob, then computing the elementwise sum.', -1, 1, 2, 1));
    this.nodes.push(new NodeDescriptor('Concat', 'Concatenates blobs along either the num or channel dimension, outputting the result.', -1, 1, -1, 1));
    this.nodes.push(new NodeDescriptor('ContrastiveLoss', 'Computes the contrastive loss', 3, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Convolution', 'Convolves the input image with a bank of learned filters, and (optionally) adds biases.', -1, 1, -1, -1, 1, -1, true));
    this.nodes.push(new NodeDescriptor('Crop', 'Takes a Blob and crop it, to the shape specified by the second input Blob, across all dimensions after the specified axis.', 2, -1, -1, 1));    
    this.nodes.push(new NodeDescriptor('Deconvolution', 'Convolve the input with a bank of learned filters, and (optionally) add biases, treating filters and convolution parameters in the opposite sense as ConvolutionLayer.', -1, 1, -1, -1, 1, -1, true));
    this.nodes.push(new NodeDescriptor('Dropout', 'During training only, sets a random portion of data to 0, adjusting the rest of the vector magnitude accordingly.', 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Eltwise', 'Compute elementwise operations, such as product and sum, along multiple input Blobs.', -1, 2, -1, 1));
    this.nodes.push(new NodeDescriptor('ELU', 'Exponential Linear Unit non-linearity', 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('EuclideanLoss', 'Computes the Euclidean (L2) loss', 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Exp', '', 1, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Filter', '', -1, 2, -1, -1, 1));
    this.nodes.push(new NodeDescriptor('Flatten','Reshapes the input Blob into flat vectors.',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('HDF5Data','Provides data to the Net from HDF5 files.',0,-1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('HDF5Output','Write blobs to disk as HDF5 files.',2,-1,-1,0));
    this.nodes.push(new NodeDescriptor('HingeLoss','Computes the hinge loss for a one-of-many classification task.',2,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Im2col','Rearranges image regions into column vectors.',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('ImageData','Provides data to the Net from image files.',0,-1,-1,2));
    this.nodes.push(new NodeDescriptor('InfogainLoss','takes an information gain (infogain) matrix specifying the value of all label pairs.',-1,2,3));
    this.nodes.push(new NodeDescriptor('InnerProduct','Also known as a "fully-connected" layer, computes an inner product with a set of learned weights, and (optionally) adds biases.',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Input','Provides data to the Net by assigning tops directly.',0,-1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Log','Computes Log',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('LRN','Normalize the input in a local region across or within feature maps.',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('LSTMUnit','Long Short-Term Memory',3,-1,-1,2));
    this.nodes.push(new NodeDescriptor('MemoryData','Provides data to the Net from memory.',0,-1,-1,2));
    this.nodes.push(new NodeDescriptor('MultinomialLogisticLoss','',2,-1,-1,1));
    this.nodes.push(new NodeDescriptor('MVN','Normalizes the input to have 0-mean and/or unit (1) variance.',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Pooling','Pools the input image by taking the max, average, etc. within regions.',1,-1,-1,-1,1,2));
    this.nodes.push(new NodeDescriptor('Power','',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('PReLU','Parameterized Rectified Linear Unit non-linearity',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Reduction','Compute "reductions"',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('ReLU','Rectified Linear Unit non-linearity',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Reshape','Reshapes the input Blob into an arbitrary-sized output Blob.',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Scale','Computes the elementwise product of two input Blobs, with the shape of the latter Blob "broadcast" to match the shape of the former.',-1,1,2,1));
    this.nodes.push(new NodeDescriptor('SigmoidCrossEntropyLoss','',2,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Sigmoid','',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Silence','',-1,1,-1,0));
    this.nodes.push(new NodeDescriptor('Slice','',1,-1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Softmax','',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('SoftmaxWithLoss','',-1,1,2));
    this.nodes.push(new NodeDescriptor('Split','',1,-1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('TanH','',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Threshold','',1,-1,-1,1));
    this.nodes.push(new NodeDescriptor('Tile','',1,-1,-1,1));
    
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
