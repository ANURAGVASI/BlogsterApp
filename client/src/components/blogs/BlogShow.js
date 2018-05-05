import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';

class BlogShow extends Component {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
  }

  renderImage() {
    console.log('in renderimage',this.props.blog.imageurl);
    if(this.props.blog.imageurl){
      return <img height="280" width="240"  src= {
        "https://s3-ap-southeast-1.amazonaws.com/blog-anurag-bucket/"+
        this.props.blog.imageurl
      } />
      return <div>not uplaoded Image</div>
    }
  }

  render() {
    if (!this.props.blog) {
      return '';
    }

    const { title, content } = this.props.blog;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
          {this.renderImage()}
      </div>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
