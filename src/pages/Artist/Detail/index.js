/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
} from 'react-bootstrap';
import Loader from '../../../components/common/Loader';
import axiosInstance from '../../../utils/axiosInstance';
import { history } from '../../../utils/history';

export default function ArstistDetails({ match }) {
  const [artist, setArtist] = useState({});
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getArtistDetails = async () => {
    try {
      const {
        params: { id },
      } = match;
      setLoading(true);
      const result = await axiosInstance.get(`/artists/${id}`);
      const topResult = await axiosInstance.get(`/artists/${id}/top`);
      const albumResult = await axiosInstance.get(`/artists/${id}/albums`);
      setArtist(result.data);
      setArtistTopTracks(topResult.data);
      setArtistAlbums(albumResult.data);
      setLoading(false);
    } catch (error) {
      if (error) {
        setError(error);
      }
    }
  };
  const getDurations = (duration) => {
    const min = Math.floor(duration / 60);
    let sec = duration - min * 60;
    if((sec.toString().split('')).length === 1) sec = `0${sec}`
    return `${min}:${sec}`;
  };

  useEffect(() => {
    getArtistDetails();
  }, []);

  const { name, picture, nb_album, nb_fan } = artist;
  return (
    <div className='container'>
      <div className='pt-5'>
        <Button
          variant='link'
          className='my-4 btn-link'
          onClick={() => history.push('/')}
        >
          &larr; Go Back
        </Button>
        <Row className='g-4'>
          {error && <p className='text-center text-danger'>{error?.message}</p>}
          {loading ? (
            <Loader />
          ) : (
            <>
              <Row className='artist-details'>
                <Col md={2}>
                  <Image src={picture} roundedCircle />
                </Col>
                <Col md={4}>
                  <h6>{name}</h6>
                  <p>Albums: {nb_album}</p>
                  <p>Fans: {nb_fan}</p>
                </Col>
                <Col md={6}>
                  <h5>Top Tracks</h5>
                  {artistTopTracks.length > 0 ? (
                    <ListGroup variant='flush'>
                      {artistTopTracks.map((track, idx) => (
                        <ListGroupItem className='track-list' key={track.id}>
                          <p>{`${idx + 1}. ${track.title} `}</p>
                          <p>{getDurations(track.duration)}</p>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className='text-danger'>There are no top tracks</p>
                  )}
                </Col>
              </Row>
              <Row xs={2} md={6} className='g-4'>
                {artistAlbums.length > 0 ? (
                  artistAlbums.map((album) => {
                    const { id, title, cover, release_date } = album;
                    return (
                      <Col
                        key={id}
                      >
                        <Card className='artist-card'>
                          <Card.Img
                            as='img'
                            variant='top'
                            src={cover}
                            className='arstist-img'
                          />
                          <Card.Body>
                            <h6>{title}</h6>
                            <p>{release_date?.split('-')[0]} </p>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <p className='text-danger'>There are no albums found</p>
                )}
              </Row>
            </>
          )}
        </Row>
      </div>
    </div>
  );
}
