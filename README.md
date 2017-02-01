# Caffe Maker

A web GUI application for creating Caffe Deep Learning networks

![screen-shot](https://github.com/omidsakhi/caffe-maker/blob/master/screenshot.png)

# Status (WIP)

This is a work in progress. Lots of features are still missing from the application. The application gives you the .prototxt file. Some parameters (specifically those with repeat) are still missing from the prototxt file.

# Requirments

- [Node.js](https://nodejs.org/en/)
- [Angular CLI](https://cli.angular.io/)

# To Run

1. Clone the trunk.
2. Run 'npm install'.
3. Run 'ng serve'
4. From the browser point to 'localhost:4200'.

# Issues

- Dragging issues on IE11 (Works with Edge and Chrome)
- Selecting issues on FireFox (Works with Edge and Chrome)

# TODO

- ~~Convert the buffet green bar to a scrollable row of units.~~
- ~~Adding parameters widget to the application.~~
- ~~Writing the added parameters to proto text file.~~
- ~~About dialog box.~~
- ~~Panning for the scene.~~
- **Reading .prototxt files and render the network.**
- Using ProtobufJS.
- Adding Solver prototxt file.
- Compiling the network in C++.
- Verifying the correctness of the network layers and parameters.
- Live simuation
- Adding debug check points
