
export enum PropertyType {
    options,
    bool,
    string,
    float,
    uint32,
    int32,
    int64
}

export class Property {
    public value: any;
    constructor(
        public type: PropertyType,
        public defaultValue: any,
        public description: string = "",
        public options: string[] = []) {
        this.value = this.defaultValue;
    }
}

export class LayerParameter {
    transform_param: TransformationParameter = new TransformationParameter();
}

//public  : Property = new Property(PropertyType.,,"");

export class AccuracyParameter extends LayerParameter {
    public _name: string = "accuracy_param";
    public top_k: Property = new Property(PropertyType.uint32, 1, "When computing accuracy, count as correct by comparing the true label to the top k scoring classes.  By default, only compare to the top scoring class (i.e. argmax).");
    public axis: Property = new Property(PropertyType.int32, 1, 'The "label" axis of the prediction blob, whose argmax corresponds to the predicted label -- may be negative to index from the end (e.g., -1 for the last axis).  For example, if axis == 1 and the predictions are (N x C x H x W), the label blob is expected to contain N*H*W ground truth labels with integer values in {0, 1, ..., C-1}.');
    ignore_label: Property = new Property(PropertyType.int32, null, "If specified, ignore instances with the given label.");
}

export class ArgMaxParameter extends LayerParameter {
    public _name: string = "argmax_param";
    public out_max_val: Property = new Property(PropertyType.bool, false, "If true produce pairs (argmax, maxval)");
    public top_k: Property = new Property(PropertyType.uint32, 2, "")
    public axis: Property = new Property(PropertyType.int32, null, "The axis along which to maximise -- may be negative to index from the end (e.g., -1 for the last axis). By default ArgMaxLayer maximizes over the flattened trailing dimensions for each index of the first / num dimension.");
}

export class BatchNormParameter extends LayerParameter {
    public _name: string = "batch_norm_param";
    public use_global_stats: Property = new Property(PropertyType.bool, null, "If false, accumulate global mean/variance values via a moving average. If true, use those accumulated values instead of computing mean/variance across the batch.");
    public moving_average_fraction: Property = new Property(PropertyType.float, 0.999, "How much does the moving average decay each iteration?");
    public eps: Property = new Property(PropertyType.float, 1e-5, "Small value to add to the variance estimate so that we don't divide by zero.");
}

export class FillerParameter extends LayerParameter {
    public type: Property = new Property(PropertyType.options, 'constant', "Filler type", ["constant", "uniform", "gaussian", "xavier", "msra"]);
    public value: Property = new Property(PropertyType.float, 0, "The value in constant filler");
    public min: Property = new Property(PropertyType.float, 0, "The min value in uniform filler");
    public max: Property = new Property(PropertyType.float, 1, "The max value in uniform filler");
    public mean: Property = new Property(PropertyType.float, 0, "The mean value in Gaussian filler");
    public std: Property = new Property(PropertyType.float, 1, "The std value in Gaussian filler");
    public sparse: Property = new Property(PropertyType.int32, -1, "The expected number of non-zero output weights for a given input in Gaussian filler -- the default -1 means don't perform sparsification.");
    public variance_norm: Property = new Property(PropertyType.options, 0, "Normalize the filler variance by fan_in, fan_out, or their average. Applies to 'xavier' and 'msra' fillers.", ["FAN_IN", "FAN_OUT", "AVERAGE"])
}

export class BiasParameter extends LayerParameter {
    public _name: string = "bias_param";
    public axis: Property = new Property(PropertyType.int32, 1, "");
    public num_axes: Property = new Property(PropertyType.int32, 1, "");
    public filler: FillerParameter = new FillerParameter();
}

export class ConcatParameter extends LayerParameter {
    public _name: string = "concat_param";
    public axis: Property = new Property(PropertyType.int32, 1, 'The axis along which to concatenate -- may be negative to index from the end (e.g., -1 for the last axis).  Other axes must have the same dimension for all the bottom blobs. By default, ConcatLayer concatenates blobs along the "channels" axis (1).');
}

export class ContrastiveLossParameter extends LayerParameter {
    public _name: string = "contrastive_loss_param";
    public margin: Property = new Property(PropertyType.float, 1.0, "Margin for dissimilar pair");
    public legacy_version: Property = new Property(PropertyType.bool, false, "The first implementation of this cost did not exactly match the cost of Hadsell et al 2006 -- using (margin - d^2) instead of (margin - d)^2. legacy_version = false (the default) uses (margin - d)^2 as proposed in the Hadsell paper. New models should probably use this version. legacy_version = true uses (margin - d^2). This is kept to support reproduce existing models and results.");
}

export class ConvolutionParameter extends LayerParameter {
    public _name: string = "convolution_param";
    public num_output: Property = new Property(PropertyType.uint32, 0, "The number of outputs for the layer");
    public bias_term: Property = new Property(PropertyType.bool, true, "To have bias terms or not");
    public pad: Property[] = [new Property(PropertyType.uint32, 0, "The padding size. Pad, kernel size, and stride are all given as a single value for equal dimensions in all spatial dimensions, or once per spatial dimension.")];
    public kernel_size: Property[] = [new Property(PropertyType.uint32, 3, "The kernel size")];
    public stride: Property[] = [new Property(PropertyType.uint32, 1, "The stride")];
    public dialation: Property[] = [new Property(PropertyType.uint32, 1, "The dialation")];
    public pad_h: Property = new Property(PropertyType.uint32, 0, "The padding height (2D only)");
    public pad_w: Property = new Property(PropertyType.uint32, 0, "// The padding width (2D only)");
    public kernel_h: Property = new Property(PropertyType.uint32, 3, "The kernel height (2D only)");
    public kernel_w: Property = new Property(PropertyType.uint32, 3, "The kernel width (2D only)");
    public stride_h: Property = new Property(PropertyType.uint32, 1, "The stride height (2D only)");
    public stride_w: Property = new Property(PropertyType.uint32, 1, "The stride width (2D only)");
    public group: Property = new Property(PropertyType.uint32, 1, "The group size for group conv");
    public weight_filler: FillerParameter = new FillerParameter();
    public bias_filler: FillerParameter = new FillerParameter();
    public engine: Property = new Property(PropertyType.options, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]);
    public axis: Property = new Property(PropertyType.int32, 1, 'The axis to interpret as "channels" when performing convolution.');
    public force_nd_im2col: Property = new Property(PropertyType.bool, false, "Whether to force use of the general ND convolution, even if a specific implementation for blobs of the appropriate number of spatial dimensions is available.");
}

export class CropParameter extends LayerParameter {
    public _name: string = "crop_param";
    public axis: Property = new Property(PropertyType.int32, 2, "");
    public offset: Property[] = [new Property(PropertyType.uint32, 0, "")];
}

export class DataParameter extends LayerParameter {
    public _name: string = "data_param";
    public source: Property = new Property(PropertyType.string, "", "Specify the data source.");
    public batch_size: Property = new Property(PropertyType.uint32, 1);
    public rand_skip: Property = new Property(PropertyType.uint32, 0);
    public backend: Property = new Property(PropertyType.options, "LEVEL_DB", "", ["LEVEL_DB", "LMBD"]);
    public force_encoded_color = new Property(PropertyType.bool, false, "Force the encoded image to have 3 color channels");
    public prefetch = new Property(PropertyType.uint32, 4, "Prefetch queue (Number of batches to prefetch to host memory, increase if data access bandwidth varies).");
}

export class DropoutParameter extends LayerParameter {
    public _name: string = "dropout_param";
    public dropout_ratio: Property = new Property(PropertyType.float, 0.5, "Dropout ratio");
}

export class BlobShape {
    public dim: Property[] = [new Property(PropertyType.int64, 1, "")];
}

export class DummyDataParameter extends LayerParameter {
    public _name: string = "dummy_data_param";
    public data_filler: FillerParameter[] = [new FillerParameter()];
    public shape: BlobShape[] = [new BlobShape()];
}

export class EltwiseParameter extends LayerParameter {
    public _name: string = "eltwise_param";
    public operation: Property = new Property(PropertyType.options, "SUM", "element-wise operation", ["PROD", "SUM", "MAX"]);
    public coeff: Property[] = [new Property(PropertyType.float, 1.0, "blob-wise coefficient for SUM operation")];
    public stable_prod_grad: Property = new Property(PropertyType.bool, true, "Whether to use an asymptotically slower (for >2 inputs) but stabler method of computing the gradient for the PROD operation. (No effect for SUM op.)");
}

export class ELUParameter extends LayerParameter {
    public _name: string = "elu_param";
    public alpha: Property = new Property(PropertyType.float, 1, "");
}

export class EmbedParameter extends LayerParameter {
    public _name: string = "embed_param";
    public num_output: Property = new Property(PropertyType.uint32, 0, "The number of outputs for the layer");
    public dim: Property = new Property(PropertyType.uint32, 0, "");
    public bias_term: Property = new Property(PropertyType.bool, true, "Whether to use a bias term");
    public weight_filler: FillerParameter = new FillerParameter();
    public bias_filler: FillerParameter = new FillerParameter();
}

export class ExpParameter extends LayerParameter {
    public _name: string = "exp_param";
    public base: Property = new Property(PropertyType.float, -1.0, "");
    public scale: Property = new Property(PropertyType.float, 1.0, "");
    public shift: Property = new Property(PropertyType.float, 0.0, "");
}

export class FlattenParameter extends LayerParameter {
    public _name: string = "flatten_param";
    public axis: Property = new Property(PropertyType.int32, 1, "The first axis to flatten: all preceding axes are retained in the output. May be negative to index from the end (e.g., -1 for the last axis).")
    public end_axis: Property = new Property(PropertyType.int32, -1, "The last axis to flatten: all following axes are retained in the output. May be negative to index from the end (e.g., the default -1 for the last axis).")
}

export class HDF5DataParameter extends LayerParameter {
    public _name: string = "hdf5_data_param";
    public source: Property = new Property(PropertyType.string, "", "Specify the data source.");
    public batch_size: Property = new Property(PropertyType.uint32, 1, "Specify the batch size.");
    public shuffle: Property = new Property(PropertyType.bool, false);
}

export class HDF5OutputParameter extends LayerParameter {
    public _name: string = "hdf5_output_param";
    public file_name: Property = new Property(PropertyType.string, "", "Specify the output filename.");
}

export class HingeLossParameter extends LayerParameter {
    public _name: string = "hinge_loss_param";
    public norm: Property = new Property(PropertyType.options, "L1", "", ["L1", "L2"]);
}

export class ImageDataParameter extends LayerParameter {
    public _name: string = "image_data_param";
    public source: Property = new Property(PropertyType.string, "", "Specify the data source.");
    public batch_size: Property = new Property(PropertyType.uint32, 1, "Specify the batch size.");
    public rand_skip: Property = new Property(PropertyType.uint32, 0, "Skip a few data points to avoid all asynchronous sgd clients to start at the same point. The skip point would be set as rand_skip * rand(0,1). Note that rand_skip should not be larger than the number of keys in the database.");
    public shuffle: Property = new Property(PropertyType.bool, false, "Whether or not ImageLayer should shuffle the list of files at every epoch.");
    public new_height: Property = new Property(PropertyType.uint32, 0, "It will also resize images to new_height if not zero.");
    public new_width: Property = new Property(PropertyType.uint32, 0, "It will also resize images to new_height if not zero.");
    public is_color: Property = new Property(PropertyType.bool, true, "Specify if the images are color or gray");
}

export class InfogainLossParameter extends LayerParameter {
    public _name: string = "infogain_loss_param";
    public source: Property = new Property(PropertyType.string, "", "Specify the infogain matrix source.");
}

export class InnerProductParameter extends LayerParameter {
    public _name: string = "inner_product_param";
    public num_output: Property = new Property(PropertyType.uint32, 32, "The number of outputs for the layer");
    public bias_term: Property = new Property(PropertyType.bool, true, "Whether to have bias terms");
    public weight_filler: FillerParameter = new FillerParameter();
    public bias_filler: FillerParameter = new FillerParameter();
    public axis: Property = new Property(PropertyType.int32, 1, "The first axis to be lumped into a single inner product computation; all preceding axes are retained in the output. May be negative to index from the end (e.g., -1 for the last axis).");
    public transpose: Property = new Property(PropertyType.bool, false, "Specify whether to transpose the weight matrix or not. If transpose == true, any operations will be performed on the transpose of the weight matrix. The weight matrix itself is not going to be transposed but rather the transfer flag of operations will be toggled accordingly.");
}

export class InputParameter extends LayerParameter {
    public _name: string = "input_param";
    public shape: BlobShape[] = [new BlobShape()];
}

export class LogParameter extends LayerParameter {
    public _name: string = "log_param";
    public base: Property = new Property(PropertyType.float, -1.0, "");
    public scale: Property = new Property(PropertyType.float, 1.0, "");
    public shift: Property = new Property(PropertyType.float, 0.0, "");
}

export class LRNParameter extends LayerParameter {
    public _name: string = "lrn_param";
    public local_size: Property = new Property(PropertyType.uint32, 5);
    public alpha: Property = new Property(PropertyType.float, 1);
    public beta: Property = new Property(PropertyType.float, 0.75);
    public norm_region: Property = new Property(PropertyType.options, "ACROSS_CHANNELS", "", ["ACROSS_CHANNELS", "WITHIN_CHANNEL"]);
    public k: Property = new Property(PropertyType.float, 1.0);
    public engine: Property = new Property(PropertyType.options, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]);
}

export class MemoryDataParameter extends LayerParameter {
    public _name: string = "memory_data_param";
    public batch_size: Property = new Property(PropertyType.uint32, 1);
    public channels: Property = new Property(PropertyType.uint32, 1);
    public height: Property = new Property(PropertyType.uint32, 1);
    public width: Property = new Property(PropertyType.uint32, 1);
}

export class MVNParameter extends LayerParameter {
    public _name: string = "mvn_param";
    public normalize_variance: Property = new Property(PropertyType.bool, true, "This parameter can be set to false to normalize mean only");
    public across_channels: Property = new Property(PropertyType.bool, false, "This parameter can be set to true to perform DNN-like MVN");
    public eps: Property = new Property(PropertyType.float, 1e-9, "Epsilon for not dividing by zero while normalizing variance");
}

export class ParameterParameter extends LayerParameter {
    public _name: string = "parameter_param";
    public shape: BlobShape[] = [new BlobShape()];
}

export class PoolingParameter extends LayerParameter {
    public _name: string = "pooling_param";
    public pool: Property = new Property(PropertyType.options, "MAX", "The pooling method", ["MAX", "AVE", "STOCHASTIC"]);
    public pad: Property = new Property(PropertyType.uint32, 0, "The padding size (equal in Y, X)");
    public pad_h: Property = new Property(PropertyType.uint32, 0, "The padding height");
    public pad_w: Property = new Property(PropertyType.uint32, 0, "The padding width");
    public kernel_size: Property = new Property(PropertyType.uint32, 3, "The kernel size (square)");
    public kernel_h: Property = new Property(PropertyType.uint32, 3, "The kernel height");
    public kernel_w: Property = new Property(PropertyType.uint32, 3, "The kernel width");
    public stride: Property = new Property(PropertyType.uint32, 1, "The stride (equal in Y, X)");
    public stride_h: Property = new Property(PropertyType.uint32, 1, "The stride height");
    public stride_w: Property = new Property(PropertyType.uint32, 1, "The stride width");
    public engine: Property = new Property(PropertyType.options, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]);
    public global_pooling: Property = new Property(PropertyType.bool, false, "If global_pooling then it will pool over the size of the bottom by doing kernel_h = bottom->height and kernel_w = bottom->width");
}

export class PowerParameter extends LayerParameter {
    public _name: string = "power_param";
    public base: Property = new Property(PropertyType.float, -1.0, "");
    public scale: Property = new Property(PropertyType.float, 1.0, "");
    public shift: Property = new Property(PropertyType.float, 0.0, "");
}

export class PReLUParameter extends LayerParameter {
    public _name: string = "prelu_param";
    public filler: FillerParameter[] = [new FillerParameter()];
    public channel_shared: Property = new Property(PropertyType.bool, false, "Whether or not slope parameters are shared across channels.");
}

export class RecurrentParameter extends LayerParameter {
    public _name: string = "recurrent_param";
    public num_output: Property = new Property(PropertyType.uint32, 0, "The number of outputs for the layer");
    public weight_filler: FillerParameter = new FillerParameter();
    public bias_filler: FillerParameter = new FillerParameter();
    public debug_info: Property = new Property(PropertyType.bool, false, "Whether to enable displaying debug_info in the unrolled recurrent net.");
    public expose_hidden: Property = new Property(PropertyType.bool, false);
}

export class PythonParameter extends LayerParameter {
    public _name: string = "python_param";
    public module: Property = new Property(PropertyType.string, "", "");
    public layer: Property = new Property(PropertyType.string, "", "");
    public param_str: Property = new Property(PropertyType.string, "", "");
    public share_in_parallel: Property = new Property(PropertyType.bool, false);
}

export class ReductionParameter extends LayerParameter {
    public _name: string = "reduction_param";
    public operation: Property = new Property(PropertyType.options, "SUM", "reduction operation", ["SUM", "ASUM", "SUMSQ", "MEAN"]);
    public axis: Property = new Property(PropertyType.int32, 0);
    public coeff: Property = new Property(PropertyType.float, 1.0, "coefficient for output");
}

export class ReLUParameter extends LayerParameter {
    public _name: string = "relu_param";
    public negative_slope: Property = new Property(PropertyType.float, 0);
    public engine: Property = new Property(PropertyType.options, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]);
}

export class ReshapeParameter extends LayerParameter {
    public _name: string = "reshape_param";
    public shape: BlobShape[] = [new BlobShape()];
    public axis: Property = new Property(PropertyType.int32, 0);
    public num_axes: Property = new Property(PropertyType.int32, -1);
}

export class ScaleParameter extends LayerParameter {
    public _name: string = "scale_param";
    public axis: Property = new Property(PropertyType.int32, 1);
    public num_axes: Property = new Property(PropertyType.int32, 1);
    public filler: FillerParameter = new FillerParameter();
    public bias_term: Property = new Property(PropertyType.bool, false);
    public bias_filler: FillerParameter = new FillerParameter();
}

export class SigmoidParameter extends LayerParameter {
    public _name: string = "sigmoid_param";
    public engine: Property = new Property(PropertyType.options, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]);
}

export class SoftmaxParameter extends LayerParameter {
    public _name: string = "softmax_param";
    public engine: Property = new Property(PropertyType.options, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]);
    public axis: Property = new Property(PropertyType.int32, 1);
}

export class SPPParameter extends LayerParameter {
    public _name: string = "spp_param";
    public pyramid_height: Property = new Property(PropertyType.uint32, 1);
    public pool: Property = new Property(PropertyType.options, "MAX", "The pooling method", ["MAX", "AVE", "STOCHASTIC"]);
    public engine: Property = new Property(PropertyType.options, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]);
}

export class SliceParameter extends LayerParameter {
    public _name: string = "slice_param";
    public axis: Property = new Property(PropertyType.int32, 1);
    public slice_point: Property[] = [new Property(PropertyType.uint32, 0)];
}

export class TanHParameter extends LayerParameter {
    public _name: string = "tanh_param";
    public engine: Property = new Property(PropertyType.options, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]);
}

export class ThresholdParameter extends LayerParameter {
    public _name: string = "threshold_param";
    public threshold: Property = new Property(PropertyType.float, 0, "Strictly positive values");
}

export class TileParameter extends LayerParameter {
    public _name: string = "tile_param";
    public axis: Property = new Property(PropertyType.int32, 1, "The index of the axis to tile.");
    public tiles: Property = new Property(PropertyType.int32, 1, "The number of copies (tiles) of the blob to output.");
}

export class WindowDataParameter extends LayerParameter {
    public _name: string = "window_data_param";
    public source: Property = new Property(PropertyType.string, "", "Specify the data source.");
    public scale: Property = new Property(PropertyType.float, 1);
    public mean_file: Property = new Property(PropertyType.string, "");
    public batch_size: Property = new Property(PropertyType.uint32, 1);
    public crop_size: Property = new Property(PropertyType.uint32, 0, "Specify if we would like to randomly crop an image.");
    public mirror: Property = new Property(PropertyType.bool, false, "Specify if we want to randomly mirror data.");
    public fg_threshold: Property = new Property(PropertyType.float, 0.5);
    public bg_threshold: Property = new Property(PropertyType.float, 0.5);
    public fg_fraction: Property = new Property(PropertyType.float, 0.25);
    public context_pad: Property = new Property(PropertyType.uint32, 0);
    public crop_mode: Property = new Property(PropertyType.options, "warp", "", ["warp", "square"]);
    public cache_images: Property = new Property(PropertyType.bool, false);
    public root_folder: Property = new Property(PropertyType.string, "", "append root_folder to locate images");
}

export class TransformationParameter {
    public scale: Property = new Property(PropertyType.float, 1, "For data pre-processing, we can do simple scaling and subtracting the data mean, if provided. Note that the mean subtraction is always carried out before scaling.");
    public mirror: Property = new Property(PropertyType.bool, false, "Specify if we want to randomly mirror data.");
    public crop_size: Property = new Property(PropertyType.uint32, 0, "Specify if we would like to randomly crop an image.");
    public mean_file: Property = new Property(PropertyType.string, "", "mean_file and mean_value cannot be specified at the same time");
    public mean_value: Property[] = [new Property(PropertyType.float, 0, "if specified can be repeated once (would subtract it from all the channels) or can be repeated the same number of times as channels (would subtract them from the corresponding channel)")];
    public force_color: Property = new Property(PropertyType.bool, false, "Force the decoded image to have 3 color channels.");
    public force_gray: Property = new Property(PropertyType.bool, false, "Force the decoded image to have 1 color channels.");
}