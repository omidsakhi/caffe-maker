# Caffe Maker

A web GUI application for creating Caffe Deep Learning networks

![screen-shot](https://github.com/omidsakhi/caffe-maker/blob/master/screenshot.png)

# Status (WIP)

This is a work in progress. Lots of features are still missing from the application. The application gives you the .prototxt file. But the file is currenly incomplete. It does contain connection between layers but no parameters yet.

# Requirments

- [Node.js](https://nodejs.org/en/)
- [Angular CLI](https://cli.angular.io/)

# To Run

1. Clone the trunk.
2. Run 'npm install'.
3. Run 'ng serve'
4. From the browser point to 'localhost:4200'.

# TODO

- Convert the buffet green bar to a scrollable row of units.
- Adding a config service to the application.
- Adding parameters widget to the application.
- Parameters for the Caffe units.
- About dialog box.
- Panning for the scene.
- Screen capture for the scene.
- Using ProtobufJS.
- Reading .prototxt files and render the network.
- Adding Solver prototxt file.
- Compiling the network in C++.
- Verifying the correctness of the network layers and parameters. 
