import React, { useEffect, useState } from "react";
import { Carousel, Card, List, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getItems } from "../../store/actions";
import { Link } from "react-router-dom";

const { Meta } = Card;

const trailers = [
  "https://www.youtube.com/embed/D0zYJ1RQ-fs",
  "https://www.youtube.com/embed/1roy4o4tqQM",
  "https://www.youtube.com/embed/bILE5BEyhdo",
  "https://www.youtube.com/embed/uBYORdr_TY8",
];

function HomePage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const pokemons = useSelector((state) => state.pokemons);
  const { language } = useSelector((state) => state.pokemons);
  const items = useSelector((state) => state.items);
  const pokemonHomePage = pokemons.pokemons.slice(0, 10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getItems());
  }, []);

  const handleClickCard = (pokemon) => {
    setIsOpenModal((isOpenModal) => !isOpenModal);
    setPokemon(pokemon);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const pokemonWrapper = () => {
    return pokemonHomePage ? (
      <>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 5,
            xl: 5,
            xxl: 5,
          }}
          dataSource={pokemonHomePage}
          renderItem={(item) => (
            <List.Item onClick={() => handleClickCard(item)}>
              <Card hoverable cover={<img alt="pokemon" src={item.image} />}>
                <Meta
                  title={
                    item?.names
                      ? item?.names.find(
                          (name) => name.language.name == language
                        ).name
                      : null
                  }
                  style={{ textAlign: "center" }}
                />
              </Card>
            </List.Item>
          )}
        ></List>
      </>
    ) : null;
  };

  return (
    <div>
      <Carousel
        slidesToShow={3}
        slidesToScroll={1}
        className="trailers"
        dots={true}
        swipeToSlide={true}
      >
        {trailers.map((video, index) => (
          <div key={index} className="trailers__item">
            <iframe
              width="100%"
              height="100%"
              src={video}
              frameBorder="0"
              //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              //   allowFullScreen
            ></iframe>
          </div>
        ))}
      </Carousel>
      <div className="pokemon-header">
        <h1>POKEMONS</h1>
        <Link to="/pokemon">See more</Link>
      </div>
      {pokemonWrapper()}
      <Modal
        visible={isOpenModal}
        onCancel={handleCancel}
        footer={null}
        className="modal-pokemon"
      >
        <div className="modal-pokemon__wrapper">
          <img
            alt="pokemon"
            src={pokemon.image}
            className="modal-pokemon__image"
          />
          <div className="modal-pokemon__content">
            <div className="modal-pokemon__title">
              <div>
                {pokemon?.names
                  ? pokemon?.names.find(
                      (name) => name.language.name == language
                    ).name
                  : null}
              </div>
              {pokemon?.stats?.hp ? `${pokemon.stats.hp} HP` : null}
            </div>
            <div style={{textAlign:'center'}}>
              <div>
                {pokemon?.height ? <span>Height: {pokemon.height}</span> : null}
              </div>
              <div>
                {pokemon?.weight ? <span>Weight: {pokemon.weight}</span> : null}
              </div>
              <img src="/icon-pokemon.png" className="modal-pokemon__icon" />
            </div>
            <div className="modal-pokemon__stats">
              <div>
                {pokemon?.stats?.attack ? (
                  <i className="fa fa-bolt" aria-hidden="true">
                    Attack: {pokemon?.stats?.attack}
                  </i>
                ) : null}
              </div>
              <div>
                {pokemon?.stats?.defense ? (
                  <i className="fa fa-shield" aria-hidden="true">
                    Defense: ${pokemon?.stats?.defense}
                  </i>
                ) : null}
              </div>
              <div>
                {pokemon?.stats?.speed ? (
                  <i className="fa fa-bolt" aria-hidden="true">
                    Speed: {pokemon?.stats?.speed}
                  </i>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div>
        <h2>ITEMS</h2>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 5,
            lg: 10,
            xl: 10,
            xxl: 10,
          }}
          dataSource={items.items}
          renderItem={(item) => (
            <List.Item>
              <Card hoverable cover={<img alt="item" src={item.image} />}>
                <Meta title={item.name} style={{ textAlign: "center" }} />
              </Card>
            </List.Item>
          )}
        ></List>
      </div>
    </div>
  );
}

export default HomePage;
