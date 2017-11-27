function Cards(props) {
  return (
    <Page>
<Section
  description={<Text> Visit <Link source="http://www.OziByte.com">OziByte.com</Link></Text>}
  title={<Text bold align="center">Match Up by OziByte</Text>}>
    <Text>
    Match Up was developed by OziByte.
    Visit our website for support enquiries.
    Email us: Support@OziByte.com - 
    (C) 2017 OziByte
    </Text>
  </Section>
      
  <Section
    title={<Text bold align="center">Select the card background design:</Text>}>
  <Select
          title={`Background Design`}
          label={`Choose`}
          settingsKey="cardBack"
          options={[
            {name:"One"},
            {name:"Two"},
            {name:"Three"},
            {name:"Four"},
      ]}
        />
  </Section>
  <Section
    title={<Text bold align="center">Select the card face design:</Text>}>
  <Select
          title={`Face Design`}
          label={`Choose`}
          settingsKey="cardFace"
          options={[
            {name:"Emojis"},
            {name:"Gems"},
            {name:"Shapes"},
            {name:"Trees"},
      ]}
        />
  </Section>    
  </Page>
  );
}

registerSettingsPage(Cards);