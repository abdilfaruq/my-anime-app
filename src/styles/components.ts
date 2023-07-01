import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ContainerDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  AnimeCard
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AnimeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 8px;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #1f1f1f;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const AnimeCardDetail = styled(AnimeCard)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;

  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-4px);
  }

  h2 {
    color: #333;
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
    text-align: center;
  }

  h3 {
    color: #666;
    font-size: 18px;
    margin-top: 8px;
    text-align: center;
  }

  p {
    color: #888;
    font-size: 16px;
    line-height: 1.4;
    margin-top: 16px;
    text-align: justify;
  }

  .episode-count {
    color: #555;
    font-size: 14px;
    margin-top: 12px;
    text-align: center;
  }

  .genres {
    color: #777;
    font-size: 14px;
    margin-top: 12px;
    text-align: center;
  }

  .average-score {
    color: #555;
    font-size: 14px;
    margin-top: 12px;
    text-align: center;
  }
`;

export const SelectedAnimeCard = styled(AnimeCard)`
  background-color: #e6e6e6;
`;

export const CollectionCard = styled.div`
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 10px;

  h3 {
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  ul {
    margin-top: 10px;
    padding: 0;
    list-style-type: none;
  }

  li {
    font-size: 16px;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
`;

export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  text-align: center;

  h2 {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  background-color: #1f1f1f;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #1f1f1f;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333333;
  }
`;

export const CollectionInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  }

  button {
    padding: 8px 16px;
    background-color: #1f1f1f;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const ButtonCollections = styled.button`
  padding: 10px 20px;
  background-color: #1f1f1f;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333333;
  }

  margin: 20px auto;
  display: block;
`;

export const NoCollections = styled.p`
  margin-top: 10px;
  font-size: 18px;
  text-align: center;
  color: #888;
`;