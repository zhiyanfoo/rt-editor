# Real-time text editing as a service

Embeddable real-time text editor.

To do
* Don't jump cursor when someone else edits
(requires fixing CodeMirror controlled component bug or move to different editor)
* Allow cut/copy and paste
* Capture logs using Elasticsearch and alert based on logs
* Enable prometheus monitoring, add metrics to services
* Display metrics on Grafana
* Automate deployment of services on AWS using Terraform.
* Expose editor as a library.
* ~~Implement CRDT data-structure for real-time editing~~
* ~~Integerate with CodeMirror~~
* ~~Seperate CRDT and react-specific methods~~
* ~~Containerise services and deploy using Docker Swarm~~
* ~~host a demo on AWS~~
