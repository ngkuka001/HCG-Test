import React, { useEffect, useState } from "react";
import { Carousel, Card, List, Modal, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../store/actions";

const { Meta } = Card;
const { Search } = Input;
const Language = {
  jp: "ja-Hrkt",
  en: "en",
};

function Pokemon() {
  const { pokemons } = useSelector((state) => state.pokemons);
  const { language } = useSelector((state) => state.pokemons);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [pokemonSearch, setPokemonSearch] = useState(pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const onSearch = (value) => {
    const newPokemon = pokemons.filter((pokemon) =>
      pokemon.name.includes(value)
    );
    setPokemonSearch(newPokemon);
  };

  const handleClickCard = (pokemon) => {
    setIsOpenModal((isOpenModal) => !isOpenModal);
    setPokemon(pokemon);
  };

  const pokemonWrapper = () => {
    return pokemonSearch ? (
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
          pagination={{
            total: pokemonSearch.length,
            showTotal: (total) => `Total ${total} pokemons`,
            defaultPageSize: 20,
            defaultCurrent: 1,
          }}
          dataSource={pokemonSearch}
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
      <div className="search-bar">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          style={{ width: 300 }}
        />
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
    </div>
  );
}

export default Pokemon;
