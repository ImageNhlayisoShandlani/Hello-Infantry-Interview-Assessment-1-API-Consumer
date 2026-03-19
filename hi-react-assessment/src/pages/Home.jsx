import PokemonCard from '../components/PokemonCard';


function Home() {
  return (
    <div>

      {/* Example placeholder — remove and replace with your implementation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        <PokemonCard name={Image} id={2}/>
        <PokemonCard name={Image} id={2}/>
        <PokemonCard name={Image} id={2}/>

        <PokemonCard name={Image} id={2}/>
        <PokemonCard name={Image} id={2}/>
        <PokemonCard name={Image} id={5}/>
        <PokemonCard name={Image} id={2}/>
      </div>
    </div>
  );
}

export default Home;
