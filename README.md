# Collaborative text editing as a service

Embeddable js collaborative plain text editor. Uses
[CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) to ensure parallel
updates work.

To do
* Don't jump cursor when someone else edits
(requires fixing CodeMirror controlled component bug or move to different editor)
* Allow cut/copy and paste
* Automate deployment of services on AWS using Terraform.
* Capture logs using Elasticsearch and alert based on logs
* Enable prometheus monitoring, add metrics to services
* Display metrics on Grafana
* Expose editor as a react component.
* Improve performance of CRDT for large documents, particularly on appends.
* ~~Implement CRDT data-structure for real-time editing~~
* ~~Integerate with CodeMirror~~
* ~~Seperate CRDT and react-specific methods~~
* ~~Containerise services and deploy using Docker Swarm~~
* ~~host a demo on AWS~~
