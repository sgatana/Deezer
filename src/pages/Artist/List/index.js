/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Loader from '../../../components/common/Loader';
import axiosInstance from '../../../utils/axiosInstance';
import { useDebouncedCallback } from '../../../utils/debounce';
import { history } from '../../../utils/history';

export default function ArtistList() {
  const [artistName, setArtistName] = useState('');
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSearchArtist = useDebouncedCallback(async () => {
    try {
      setLoading(true);
      setArtists([]);
      const res = await axiosInstance.get(`/artists?name=${artistName}`);
      setLoading(false);

      setArtists(res.data);
    } catch (error) {
      if (error) {
        setError(error);
      }
    }
  }, 1000);

  useEffect(() => {
    if (artistName) {
      onSearchArtist();
    }
  }, [artistName]);

  return (
    <div className='container'>
      <div className='row pt-5 seach-container'>
        <h3>Welcome to Deezer</h3>
        <p>Please search your preferred artist below</p>
        <Col>
          <Form.Control
            placeholder='Enter artist name'
            value={artistName}
            className='search-field'
            onChange={({ target }) => {
              setArtistName(target.value);
            }}
          />
        </Col>
      </div>
      <div className='artist-list mt-5'>
        <Row xs={1} md={6} className='g-4'>
          {error && <p className='text-center text-danger'>{error?.message}</p>}
          {loading ? (
            <Loader />
          ) : artists.length > 0 ? (
            artists.map((artist) => {
              const { id, name, picture, nb_album, nb_fan } = artist;
              return (
                <Col
                  key={id}
                  role='button'
                  onClick={() => history.push(`/artist/${id}`)}
                >
                  <Card className='artist-card'>
                    <Card.Img
                      as='img'
                      variant='top'
                      src={picture}
                      className='arstist-img'
                    />
                    <Card.Body>
                      <h6>{name}</h6>
                      <p>Albums: {nb_album}</p>
                      <p>Fans: {nb_fan}</p>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : null}
        </Row>
      </div>
    </div>
  );
}
