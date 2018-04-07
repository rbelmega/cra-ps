import React from 'react';
import Twitter from '../twitter/Twitter';
import Bio from '../bio/Bio';
import Contacts from '../contacts/Contacts';
import Footer from '../footer';

export class Body extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchBio } = this.props;
    console.log(this.props);
    fetchBio();
  }

  render() {
    return (
      <div
        style={{
          margin: '0 5%',
          backgroundColor: '#252525',
          borderTop: '3px solid #00a3cd',
        }}
      >
        <div
          className="wrapper"
          style={{
            alignItems: 'stretch',
          }}
        >
          <Twitter />
          <Bio bio={this.props.bio} activities={this.props.activities} />

          <div className="me" style={{ padding: 20 }}>
            <section className="profile-image-wrapper">
              <div className="profile-image" />
            </section>
            {/*<p><i className='fa fa-map-marker'></i>Ivano-Frankivsk, Ukraine</p>*/}
            <Contacts />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Body;
