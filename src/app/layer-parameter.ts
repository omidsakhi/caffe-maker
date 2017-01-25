
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
        public protoText: string,
        public type: PropertyType,
        public repeat: boolean,
        public defaultValue: any,
        public description: string = "",
        public options: string[] = []) {
        this.value = this.defaultValue;
    }

    toProtoText(indent : number = 0) : string {
        return (this.value != this.defaultValue && this.value != null)?(" ".repeat(indent) + this.protoText + ": " + this.value + "\n"):"";
    }
}

export class PropertyGroup {
    constructor(
        public displayText: string,
        public protoText: string,
        public properties: Property[],
        public propertyGroups: PropertyGroup[] = [],
        public repeat: boolean = false,
        public encapsulate : boolean = true      
    ) { }

    toProtoText(indent : number = 0) : string {        
        var innerText = "";
        for (let p of this.properties)
            innerText += p.toProtoText(indent+2);
        for (let g of this.propertyGroups)
            innerText += g.toProtoText(indent+2);                
        if (innerText == "") return "";
        if (this.encapsulate)
            return " ".repeat(indent) + this.protoText + " {\n" + innerText + " ".repeat(indent) + "}\n";
        else
            return innerText;
    }
}

export class TransformationParameter extends PropertyGroup {
    constructor(displayText: string, protoText: string) {
        super(displayText, protoText, [
            new Property("scale", PropertyType.float, false, 1, "For data pre-processing, we can do simple scaling and subtracting the data mean, if provided. Note that the mean subtraction is always carried out before scaling."),
            new Property("mirror", PropertyType.bool, false, false, "Specify if we want to randomly mirror data."),
            new Property("crop_size", PropertyType.uint32, false, 0, "Specify if we would like to randomly crop an image."),
            new Property("mean_file", PropertyType.string, false, null, "mean_file and mean_value cannot be specified at the same time"),
            new Property("mean_value", PropertyType.float, true, null, "if specified can be repeated once (would subtract it from all the channels) or can be repeated the same number of times as channels (would subtract them from the corresponding channel)"),
            new Property("force_color", PropertyType.bool, false, false, "Force the decoded image to have 3 color channels."),
            new Property("force_gray", PropertyType.bool, false, false, "Force the decoded image to have 1 color channels.")
        ]);
    }
}

export class FillerParameter extends PropertyGroup {
    constructor(displayText: string, protoText: string, repeat: boolean = false) {
        super(displayText, protoText, [
            new Property("type", PropertyType.options, false, 'constant', "Filler type", ["constant", "uniform", "gaussian", "xavier", "msra"]),
            new Property("value", PropertyType.float, false, 0, "The value in constant filler"),
            new Property("min", PropertyType.float, false, 0, "The min value in uniform filler"),
            new Property("max", PropertyType.float, false, 1, "The max value in uniform filler"),
            new Property("mean", PropertyType.float, false, 0, "The mean value in Gaussian filler"),
            new Property("std", PropertyType.float, false, 1, "The std value in Gaussian filler"),
            new Property("sparse", PropertyType.int32, false, -1, "The expected number of non-zero output weights for a given input in Gaussian filler -- the default -1 means don't perform sparsification."),
            new Property("variance_norm", PropertyType.options, false, "FAN_IN", "Normalize the filler variance by fan_in, fan_out, or their average. Applies to 'xavier' and 'msra' fillers.", ["FAN_IN", "FAN_OUT", "AVERAGE"])
        ], [], repeat)
    }

}

export class BlobShape extends PropertyGroup {
    constructor(displayText: string, protoText: string, repeat: boolean = false) {
        super(displayText, protoText, [
            new Property("dim", PropertyType.int64, true, null, "")
        ], [], repeat);
    }
}

export class LayerParameter extends PropertyGroup {
    constructor(
        public displayText: string = "LayerParameter",
        public protoText : string = "layer_param",
        properties: Property[] = [],
        propertyGroups: PropertyGroup[] = []) {
        super(displayText.replace("Parameter",""),"",[
            new Property("loss_weight",PropertyType.float,true,null,"")
        ],[
            new TransformationParameter("transform_param", "transform_param"),
            new PropertyGroup(displayText,protoText,properties,propertyGroups,false,true)
        ],false,false);                
    }
}

//public  : Property = new Property(PropertyType.,,"");

export class AccuracyParameter extends LayerParameter {
    constructor() {
        super("AccuracyParameter","accuracy_param", [
            new Property("top_k", PropertyType.uint32, false, 1, "When computing accuracy, count as correct by comparing the true label to the top k scoring classes.  By default, only compare to the top scoring class (i.e. argmax)."),
            new Property("axis", PropertyType.int32, false, 1, 'The "label" axis of the prediction blob, whose argmax corresponds to the predicted label -- may be negative to index from the end (e.g., -1 for the last axis).  For example, if axis == 1 and the predictions are (N x C x H x W), the label blob is expected to contain N*H*W ground truth labels with integer values in {0, 1, ..., C-1}.'),
            new Property("ignore_label", PropertyType.int32, false, null, "If specified, ignore instances with the given label.")
        ]);
    }
}

export class ArgMaxParameter extends LayerParameter {
    constructor() {
        super("ArgMaxParameter","argxmax_param", [
            new Property("out_max_val", PropertyType.bool, false, false, "If true produce pairs (argmax, maxval)"),
            new Property("top_k", PropertyType.uint32, false, 2, ""),
            new Property("axis", PropertyType.int32, false, null, "The axis along which to maximise -- may be negative to index from the end (e.g., -1 for the last axis). By default ArgMaxLayer maximizes over the flattened trailing dimensions for each index of the first / num dimension.")
        ]);
    }
}

export class BatchNormParameter extends LayerParameter {
    constructor() {
        super("BatchNormParameter","batch_norm_param", [
            new Property("use_global_stats", PropertyType.bool, false, null, "If false, accumulate global mean/variance values via a moving average. If true, use those accumulated values instead of computing mean/variance across the batch."),
            new Property("moving_average_fraction", PropertyType.float, false, 0.999, "How much does the moving average decay each iteration?"),
            new Property("eps", PropertyType.float, false, 1e-5, "Small value to add to the variance estimate so that we don't divide by zero.")
        ]);
    }
}

export class BiasParameter extends LayerParameter {
    constructor() {
        super("BiasParameter","bias_param", [
            new Property("axis", PropertyType.int32, false, 1, ""),
            new Property("num_axes", PropertyType.int32, false, 1, ""),
        ], [new FillerParameter("filler", "filler")]);
    }
}

export class ConcatParameter extends LayerParameter {
    constructor() {
        super("ConcatParameter","concat_param", [
            new Property("axis", PropertyType.int32, false, 1, 'The axis along which to concatenate -- may be negative to index from the end (e.g., -1 for the last axis).  Other axes must have the same dimension for all the bottom blobs. By default, ConcatLayer concatenates blobs along the "channels" axis (1).')
        ]);
    }
}

export class ContrastiveLossParameter extends LayerParameter {
    constructor() {
        super("ContrastiveLossParameter","contrastive_loss_param", [
            new Property("margin", PropertyType.float, false, 1.0, "Margin for dissimilar pair"),
            new Property("legacy_version", PropertyType.bool, false, false, "The first implementation of this cost did not exactly match the cost of Hadsell et al 2006 -- using (margin - d^2) instead of (margin - d)^2. legacy_version = false (the default) uses (margin - d)^2 as proposed in the Hadsell paper. New models should probably use this version. legacy_version = true uses (margin - d^2). This is kept to support reproduce existing models and results.")
        ])
    }
}

export class ConvolutionParameter extends LayerParameter {
    constructor() {
        super("ConvolutionParameter","convolution_param", [
            new Property("num_output", PropertyType.uint32, false, null, "The number of outputs for the layer"),
            new Property("bias_term", PropertyType.bool, false, true, "To have bias terms or not"),
            new Property("pad", PropertyType.uint32, true, 0, "The padding size. Pad, kernel size, and stride are all given as a single value for equal dimensions in all spatial dimensions, or once per spatial dimension."),
            new Property("kernel_size", PropertyType.uint32, true, 3, "The kernel size"),
            new Property("stride", PropertyType.uint32, true, 1, "The stride"),
            new Property("dialation", PropertyType.uint32, true, 1, "The dialation"),
            new Property("pad_h", PropertyType.uint32, false, 0, "The padding height (2D only)"),
            new Property("pad_w", PropertyType.uint32, false, 0, "// The padding width (2D only)"),
            new Property("kernel_h", PropertyType.uint32, false, 3, "The kernel height (2D only)"),
            new Property("kernel_w", PropertyType.uint32, false, 3, "The kernel width (2D only)"),
            new Property("stride_h", PropertyType.uint32, false, 1, "The stride height (2D only)"),
            new Property("stride_w", PropertyType.uint32, false, 1, "The stride width (2D only)"),
            new Property("group", PropertyType.uint32, false, 1, "The group size for group conv"),
            new Property("engine", PropertyType.options, false, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]),
            new Property("axis", PropertyType.int32, false, 1, 'The axis to interpret as "channels" when performing convolution.'),
            new Property("force_nd_im2col", PropertyType.bool, false, false, "Whether to force use of the general ND convolution, even if a specific implementation for blobs of the appropriate number of spatial dimensions is available.")
        ], [
                new FillerParameter("weight_filler", "weight_filler"),
                new FillerParameter("bias_filler", "bias_filler")
            ])
    }
}

export class CropParameter extends LayerParameter {
    constructor() {
        super("CropParameter","crop_param", [
            new Property("axis", PropertyType.int32, false, 2, ""),
            new Property("offset", PropertyType.uint32, true, 0, "")
        ])
    }
}

export class DataParameter extends LayerParameter {
    constructor() {
        super("DataParameter","data_param", [
            new Property("source", PropertyType.string, false, "", "Specify the data source."),
            new Property("batch_size", PropertyType.uint32, false, 1),
            new Property("rand_skip", PropertyType.uint32, false, 0),
            new Property("backend", PropertyType.options, false, "LEVEL_DB", "", ["LEVEL_DB", "LMBD"]),
            new Property("force_encoded_color", PropertyType.bool, false, false, "Force the encoded image to have 3 color channels"),
            new Property("prefetch", PropertyType.uint32, false, 4, "Prefetch queue (Number of batches to prefetch to host memory, increase if data access bandwidth varies).")
        ])
    }
}

export class DropoutParameter extends LayerParameter {
    constructor() {
        super("DropoutParameter","dropout_param", [
            new Property("dropout_ratio", PropertyType.float, false, 0.5, "Dropout ratio")
        ])
    }
}

export class DummyDataParameter extends LayerParameter {
    constructor() {
        super("DummyDataParameter","dummy_data_param", [], [
            new FillerParameter("data_filler", "data_filler", true),
            new BlobShape("shape", "shape", true)
        ])
    }
}

export class EltwiseParameter extends LayerParameter {
    constructor() {
        super("EltwiseParameter","eltwise_param", [
            new Property("operation", PropertyType.options, false, "SUM", "element-wise operation", ["PROD", "SUM", "MAX"]),
            new Property("coeff", PropertyType.float, true, 1.0, "blob-wise coefficient for SUM operation"),
            new Property("stable_prod_grad", PropertyType.bool, false, true, "Whether to use an asymptotically slower (for >2 inputs) but stabler method of computing the gradient for the PROD operation. (No effect for SUM op.)")
        ]);
    }
}

export class ELUParameter extends LayerParameter {
    constructor() {
        super("ELUParameter","elu_param", [new Property("alpha", PropertyType.float, false, 1, "")]);
    }
}

export class EmbedParameter extends LayerParameter {
    constructor() {
        super("EmbedParameter","embed_param", [
            new Property("num_output", PropertyType.uint32, false, null, "The number of outputs for the layer"),
            new Property("dim", PropertyType.uint32, false, 0, ""),
            new Property("bias_term", PropertyType.bool, false, true, "Whether to use a bias term")
        ], [
                new FillerParameter("weight_filler", "weight_filler"),
                new FillerParameter("bias_filler", "bias_filler")
            ]);
    }
}

export class ExpParameter extends LayerParameter {
    constructor() {
        super("ExpParameter","exp_param", [
            new Property("base", PropertyType.float, false, -1.0, ""),
            new Property("scale", PropertyType.float, false, 1.0, ""),
            new Property("shift", PropertyType.float, false, 0.0, "")
        ]);
    }
}

export class PowerParameter extends LayerParameter {
    constructor() {
        super("PowerParameter","power_param", [
            new Property("base", PropertyType.float, false, -1.0, ""),
            new Property("scale", PropertyType.float, false, 1.0, ""),
            new Property("shift", PropertyType.float, false, 0.0, "")
        ]);
    }
}

export class LogParameter extends LayerParameter {
    constructor() {
        super("LogParameter","log_param", [
            new Property("base", PropertyType.float, false, -1.0, ""),
            new Property("scale", PropertyType.float, false, 1.0, ""),
            new Property("shift", PropertyType.float, false, 0.0, "")
        ]);
    }
}

export class FlattenParameter extends LayerParameter {
    constructor() {
        super("FlattenParameter","flatten_param", [
            new Property("axis", PropertyType.int32, false, 1, "The first axis to flatten: all preceding axes are retained in the output. May be negative to index from the end (e.g., -1 for the last axis)."),
            new Property("end_axis", PropertyType.int32, false, -1, "The last axis to flatten: all following axes are retained in the output. May be negative to index from the end (e.g., the default -1 for the last axis).")
        ]);
    }
}

export class HDF5DataParameter extends LayerParameter {
    constructor() {
        super("HDF5DataParameter","hdf5_data_param", [
            new Property("source", PropertyType.string, false, "", "Specify the data source."),
            new Property("batch_size", PropertyType.uint32, false, 1, "Specify the batch size."),
            new Property("shuffle", PropertyType.bool, false, false)
        ]);
    }
}

export class HDF5OutputParameter extends LayerParameter {
    constructor() {
        super("HDF5OutputParameter","hdf5_output_param", [
            new Property("file_name", PropertyType.string, false, "", "Specify the output filename.")
        ]);
    }
}

export class HingeLossParameter extends LayerParameter {
    constructor() {
        super("HingeLossParameter","hinge_loss_param", [
            new Property("norm", PropertyType.options, false, "L1", "", ["L1", "L2"])
        ]);
    }
}

export class ImageDataParameter extends LayerParameter {
    constructor() {
        super("ImageDataParameter","image_data_param", [
            new Property("source", PropertyType.string, false, "", "Specify the data source."),
            new Property("batch_size", PropertyType.uint32, false, 1, "Specify the batch size."),
            new Property("rand_skip", PropertyType.uint32, false, 0, "Skip a few data points to avoid all asynchronous sgd clients to start at the same point. The skip point would be set as rand_skip * rand(0,1). Note that rand_skip should not be larger than the number of keys in the database."),
            new Property("shuffle", PropertyType.bool, false, false, "Whether or not ImageLayer should shuffle the list of files at every epoch."),
            new Property("new_height", PropertyType.uint32, false, 0, "It will also resize images to new_height if not zero."),
            new Property("new_width", PropertyType.uint32, false, 0, "It will also resize images to new_height if not zero."),
            new Property("is_color", PropertyType.bool, false, true, "Specify if the images are color or gray")
        ])
    }
}

export class InfogainLossParameter extends LayerParameter {
    constructor() {
        super("InfogainLossParameter","infogain_loss_param", [
            new Property("source", PropertyType.string, false, "", "Specify the infogain matrix source.")
        ]);
    }
}

export class InnerProductParameter extends LayerParameter {
    constructor() {
        super("InnerProductParameter","inner_product_param", [
            new Property("num_output", PropertyType.uint32, false, null, "The number of outputs for the layer"),
            new Property("bias_term", PropertyType.bool, false, true, "Whether to have bias terms"),
            new Property("axis", PropertyType.int32, false, 1, "The first axis to be lumped into a single inner product computation; all preceding axes are retained in the output. May be negative to index from the end (e.g., -1 for the last axis)."),
            new Property("transpose", PropertyType.bool, false, false, "Specify whether to transpose the weight matrix or not. If transpose == true, any operations will be performed on the transpose of the weight matrix. The weight matrix itself is not going to be transposed but rather the transfer flag of operations will be toggled accordingly.")
        ], [
                new FillerParameter("weight_filler", "weight_filler"),
                new FillerParameter("bias_filler", "bias_filler")
            ]);
    }
}

export class InputParameter extends LayerParameter {
    constructor() {
        super("InputParameter","inner_param", [], [
            new BlobShape("shape", "shape", true)
        ])
    }
}

export class ParameterParameter extends LayerParameter {
    constructor() {
        super("ParameterParameter","parameter_param", [], [
            new BlobShape("shape", "shape", true)
        ])
    }
}

export class LRNParameter extends LayerParameter {
    constructor() {
        super("LRNParameter","lrn_param", [
            new Property("local_size", PropertyType.uint32, false, 5),
            new Property("alpha", PropertyType.float, false, 1),
            new Property("beta", PropertyType.float, false, 0.75),
            new Property("norm_region", PropertyType.options, false, "ACROSS_CHANNELS", "", ["ACROSS_CHANNELS", "WITHIN_CHANNEL"]),
            new Property("k", PropertyType.float, false, 1.0),
            new Property("engine", PropertyType.options, false, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"])
        ]);
    }
}

export class MemoryDataParameter extends LayerParameter {
    constructor() {
        super("MemoryDataParameter","memory_data_param", [
            new Property("batch_size", PropertyType.uint32, false, null),
            new Property("channels", PropertyType.uint32, false, null),
            new Property("height", PropertyType.uint32, false, null),
            new Property("weight", PropertyType.uint32, false, null)
        ]);
    }
}

export class MVNParameter extends LayerParameter {
    constructor() {
        super("MVNParameter","mvn_param", [
            new Property("normalize_variance", PropertyType.bool, false, true, "This parameter can be set to false to normalize mean only"),
            new Property("across_channels", PropertyType.bool, false, false, "This parameter can be set to true to perform DNN-like MVN"),
            new Property("eps", PropertyType.float, false, 1e-9, "Epsilon for not dividing by zero while normalizing variance")
        ]);
    }
}

export class PoolingParameter extends LayerParameter {
    constructor() {
        super("PoolingParameter","pooling_param", [
            new Property("pool", PropertyType.options, false, "MAX", "The pooling method", ["MAX", "AVE", "STOCHASTIC"]),
            new Property("pad", PropertyType.uint32, false, 0, "The padding size (equal in Y, X)"),
            new Property("pad_h", PropertyType.uint32, false, 0, "The padding height"),
            new Property("pad_w", PropertyType.uint32, false, 0, "The padding width"),
            new Property("kernel_size", PropertyType.uint32, false, 3, "The kernel size (square)"),
            new Property("kernel_h", PropertyType.uint32, false, 3, "The kernel height"),
            new Property("kernel_w", PropertyType.uint32, false, 3, "The kernel width"),
            new Property("stride", PropertyType.uint32, false, 1, "The stride (equal in Y, X)"),
            new Property("stride_h", PropertyType.uint32, false, 1, "The stride height"),
            new Property("stride_w", PropertyType.uint32, false, 1, "The stride width"),
            new Property("engine", PropertyType.options, false, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]),
            new Property("global_pooling", PropertyType.bool, false, false, "If global_pooling then it will pool over the size of the bottom by doing kernel_h = bottom->height and kernel_w = bottom->width")
        ]);
    }
}

export class PReLUParameter extends LayerParameter {
    constructor() {
        super("PReLUParameter","prelu_param", [
            new Property("channel_shared", PropertyType.bool, false, false, "Whether or not slope parameters are shared across channels.")
        ], [
                new FillerParameter("filler", "filler")
            ]);
    }
}

export class RecurrentParameter extends LayerParameter {
    constructor() {
        super("RecurrentParameter","recurrent_param", [
            new Property("num_output", PropertyType.uint32, false, null, "The number of outputs for the layer"),
            new Property("debug_info", PropertyType.bool, false, false, "Whether to enable displaying debug_info in the unrolled recurrent net."),
            new Property("expose_hidden", PropertyType.bool, false, false)
        ], [
                new FillerParameter("weight_filler", "weight_filler"),
                new FillerParameter("bias_filler", "bias_filler")
            ]);
    }
}

export class PythonParameter extends LayerParameter {
    constructor() {
        super("PythonParameter","python_param", [
            new Property("module", PropertyType.string, false, "", ""),
            new Property("layer", PropertyType.string, false, "", ""),
            new Property("param_str", PropertyType.string, false, "", ""),
            new Property("share_in_parallel", PropertyType.bool, false, false)
        ]);
    }
}

export class ReductionParameter extends LayerParameter {
    constructor() {
        super("ReductionParameter","reduction_param", [
            new Property("operation", PropertyType.options, false, "SUM", "reduction operation", ["SUM", "ASUM", "SUMSQ", "MEAN"]),
            new Property("axis", PropertyType.int32, false, 0),
            new Property("coeff", PropertyType.float, false, 1.0, "coefficient for output")
        ]);
    }
}

export class ReLUParameter extends LayerParameter {
    constructor() {
        super("ReLUParameter","relu_param", [
            new Property("negative_slope", PropertyType.float, false, 0),
            new Property("engine", PropertyType.options, false, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]),
        ]);
    }
}

export class ReshapeParameter extends LayerParameter {
    constructor() {
        super("ReshapeParameter","reshape_param", [
            new Property("axis", PropertyType.int32, false, 0),
            new Property("num_axes", PropertyType.int32, false, -1)
        ], [
                new BlobShape("shape", "shape", true)
            ]);
    }
}

export class SigmoidParameter extends LayerParameter {
    constructor() {
        super("SigmoidParameter","sigmoid_param", [
            new Property("engine", PropertyType.options, false, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]),
        ]);
    }
}

export class TanHParameter extends LayerParameter {
    constructor() {
        super("TanHParameter","tanh_param", [
            new Property("engine", PropertyType.options, false, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]),
        ]);
    }
}

export class ScaleParameter extends LayerParameter {
    constructor() {
        super("ScaleParameter","scale_param", [
            new Property("axis", PropertyType.int32, false, 1),
            new Property("num_axes", PropertyType.int32, false, 1),
            new Property("bias_term", PropertyType.bool, false, false)
        ], [
                new FillerParameter("filler", "filler"),
                new FillerParameter("bias_filler", "bias_filler"),
            ]);
    }
}

export class SoftmaxParameter extends LayerParameter {
    constructor() {
        super("SoftmaxParameter","softmax_param", [
            new Property("engine", PropertyType.options, false, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"]),
            new Property("axis", PropertyType.int32, false, 1)
        ]);
    }
}

export class SPPParameter extends LayerParameter {
    constructor() {
        super("SPPParameter","spp_param", [
            new Property("pyramid_height", PropertyType.uint32, false, 1),
            new Property("pool", PropertyType.options, false, "MAX", "The pooling method", ["MAX", "AVE", "STOCHASTIC"]),
            new Property("engine", PropertyType.options, false, "DEFAULT", "", ["DEFAULT", "CAFFE", "CUDNN"])
        ]);
    }
}

export class SliceParameter extends LayerParameter {
    constructor() {
        super("SliceParameter","slice_pram", [
            new Property("axis", PropertyType.int32, false, 1),
            new Property("slice_point", PropertyType.uint32, true, 0)
        ]);
    }
}

export class ThresholdParameter extends LayerParameter {
    constructor() {
        super("ThresholdParameter","threshold_param", [
            new Property("threshold", PropertyType.float, false, 0, "Strictly positive values")
        ]);
    }
}

export class TileParameter extends LayerParameter {
    constructor() {
        super("TileParameter","tile_param", [
            new Property("axis", PropertyType.int32, false, 1, "The index of the axis to tile."),
            new Property("tiles", PropertyType.int32, false, 1, "The number of copies (tiles) of the blob to output.")
        ]);
    }
}

export class WindowDataParameter extends LayerParameter {
    constructor() {
        super("WindowDataParameter","window_data_param", [
            new Property("source", PropertyType.string, false, "", "Specify the data source."),
            new Property("scale", PropertyType.float, false, 1),
            new Property("mean_file", PropertyType.string, false, ""),
            new Property("batch_size", PropertyType.uint32, false, 1),
            new Property("crop_size", PropertyType.uint32, false, 0, "Specify if we would like to randomly crop an image."),
            new Property("mirror", PropertyType.bool, false, false, "Specify if we want to randomly mirror data."),
            new Property("fg_threshold", PropertyType.float, false, 0.5),
            new Property("bg_threshold", PropertyType.float, false, 0.5),
            new Property("fg_fraction", PropertyType.float, false, 0.25),
            new Property("context_pad", PropertyType.uint32, false, 0),
            new Property("crop_mode", PropertyType.options, false, "warp", "", ["warp", "square"]),
            new Property("cache_images", PropertyType.bool, false, false),
            new Property("root_folder", PropertyType.string, false, "", "append root_folder to locate images"),
        ]);
    }
}