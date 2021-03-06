import React from 'react';

export default class Items extends React.PureComponent {
  render() {
    if (this.props.items.length === 0) return null;

    let seeMoreHTML;
    if (this.props.seeMoreFunction && this.props.items.length === 3) seeMoreHTML = <button className='addToMue seemore' onClick={this.props.seeMoreFunction}>{this.props.seeMoreTitle}</button>;

    return (
        <div>
            {seeMoreHTML}
            <h1>{this.props.title}</h1>
            <div className='items'>
                {this.props.items.map((item) =>
                    <div className='item' onClick={() => this.props.toggleFunction(item.name)} key={item.name}>
                        <img alt='icon' draggable={false} src={'https://external-content.duckduckgo.com/iu/?u=' + item.icon_url} />
                        <div className='details'>
                            <h4>{item.display_name}</h4>
                            <p>{item.author}</p>
                        </div>
                    </div>)}
                </div>
          </div>
    );
  }
}