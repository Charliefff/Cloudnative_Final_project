import { Grid, Image, Button, Segment } from "semantic-ui-react";
import React from "react";
// 這邊完成了這兩天會在併上去
function Home() {
  return (
    <Grid celled="internally">
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/wireframe/image.png"
            size="large"
          />

          <Button basic>上傳頭貼</Button>
          <Segment>
            <h1>頭貼放上面下面加使用者資訊</h1>
            <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
            <h1>4</h1>
            <h1>5</h1>
            <h1>6</h1>
            <h1>7</h1>
            <h1>8</h1>
          </Segment>
        </Grid.Column>

        <Grid.Column width={13}>
          <h1>還沒想到</h1>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
