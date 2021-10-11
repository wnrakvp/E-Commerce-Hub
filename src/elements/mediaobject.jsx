import { h } from 'vue'
const MediaObject = (props, context) => {
  return h(`<div class="d-flex text-muted pt-3"><p class="pb-3 mb-0 small lh-sm border-bottom"><strong class="d-block text-gray-dark">${props.title}</strong>${props.details}</p></div>`, context.attrs, context.slots)
}
MediaObject.props = {
  title: String,
  details: String
}
export default MediaObject