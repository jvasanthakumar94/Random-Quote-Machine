const initialQuotes = [
{
  quote: "The greater danger for most of us isn’t that our aim is too high and miss it, but that it is too low and we reach it.",
  author: "Michelangelo" }];




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      quotes: "",
      bgColor: "tomato",
      quote: initialQuotes[0]["quote"],
      author: initialQuotes[0]["author"] };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://gist.githubusercontent.com/jvasanthakumar94/65ebc3c226d02899ea766e1d985dae94/raw/7458b0e371517fa5763cdf509bcdcad5c60afb9a/quote.json").

    then(res => res.json()).
    then(
    result => {
      this.setState({
        isLoaded: true,
        quotes: result.quotes });

    },
    error => {
      this.setState({
        isLoaded: false,
        error });

    });

  }
  handleSubmit() {
    let quotes = this.state.quotes;
    let quoteLength = quotes.length;
    const randomQuote = Math.floor(Math.random() * quoteLength);

    const colors = ["#A1C653", "#92C6B6", "#F87B7E", "#E69C5E"];

    let colCount = Math.floor(Math.random() * colors.length);

    this.setState({
      quote: quotes[randomQuote]["quote"],
      author: quotes[randomQuote]["author"],
      prevColor: this.state.bgColor,
      bgColor: colors[colCount] });

  }

  render() {
    const { isLoaded, quotes, error } = this.state;
    if (error) {
      return React.createElement("div", null, "Error: ", error.message);
    } else if (!isLoaded) {
      return React.createElement("div", null, "Loading...");
    } else {

      let quot = this.state.quote;
      let twitterLink = "https://twitter.com/intent/tweet?hashtags=quotes&text=".
      concat(encodeURIComponent(quot));
      return (
        React.createElement("div", { id: "main", className: "wrapper" },
        React.createElement("style", null,
        `
        :root {
          --bg-color: ${this.state.bgColor};
          --quotetxt-color: ${this.state.bgColor};
          --prev-color:${this.state.prevColor};
         
          }
        `),

        React.createElement("div", { id: "header" },
        React.createElement("h1", null, "Random Quote Machine")),

        React.createElement("div", { id: "quote-box" },
        React.createElement("div", { id: "text" },
        React.createElement("blockquote", null,
        React.createElement("i", { className: "fa fa-quote-left" }), " ", quot,
        React.createElement("i", { className: "fa fa-quote-right" }))),


        React.createElement("div", { id: "author" },
        React.createElement("p", null, "- ", this.state.author)),

        React.createElement("div", { className: "row" },
        React.createElement("div", { class: "col-xs-6", id: "new-quote" },
        React.createElement("a", {
          id: "tweet-quote",
          title: "Click here to generate random quotes",
          href: twitterLink,
          target: "_blank" },

        React.createElement("i", { className: "fa fa-twitter fa-2x" }))),


        React.createElement("div", { class: "col-xs-6 " },
        React.createElement("button", {
          type: "button",
          className: "btn",
          title: "Click here to generate random quotes",
          onClick: this.handleSubmit }, "New quote"))))));








    }
  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));