import React from 'react';
import { createPopper } from "@popperjs/core";
import FocusTrap from "focus-trap-react";

import './Popup.css';
import Portal from "./Portal";

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.triggerRef = React.createRef();
    this.popupRef = React.createRef();

    this.state = {
      isOpen: false,
    }
    this.togglePopup = this.togglePopup.bind(this);
  }

  componentDidMount() {
    console.log(this.triggerRef.current);
    console.log(this.popupRef.current);

    this.popper = createPopper(
      this.triggerRef.current,
      this.popupRef.current,
      {
        placement: 'bottom-start',
        strategy: 'fixed',
      }
    );
  }
  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  togglePopup() {
    this.setState((state) => {
      return {
        isOpen: !state.isOpen,
      }
    }, () => {
      this.popper.forceUpdate();
    });
  }

  render() {
    return (
      <React.Fragment>
        <div ref={this.triggerRef} className="trigger" onClick={this.togglePopup}>
          Open Popup
        </div>

        <Portal>
          <div className="popup_container" ref={this.popupRef}>
            {this.state.isOpen &&
            <React.Fragment>
              <FocusTrap focusTrapOptions={{
                onDeactivate: this.togglePopup,
                clickOutsideDeactivates: true,
              }}>
                <div ref={this.popupRef} className="popup">
                  <div tabIndex={0}>
                    I am the popup
                  </div>
                </div>
              </FocusTrap>
            </React.Fragment>}
          </div>
        </Portal>
      </React.Fragment>
    );
  }
}

export default Popup;
