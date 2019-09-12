import config from "../../data/BaseConfig.json"

const Variables = {
  text_primary_color: `#333333`,
  dark_base_color: config.eventSolidColor,
  light_bc: `#f5ddb9`,
  dark_base_color_2: LightenDarkenColor(config.eventSolidColor,50),
  black_bg: config.eventDarkColor,
  border_color: `#ddd`,
  button_color: `#FF9900`,
  page_bg_color: `#eeeeee`,
  link_color: `#000000`,
  header_color: `#FF9900`,
  muted_color: `#999999`,
  faded_color: `#bbbbbb`,
  rc_main: `#d32f2f`,
  light_bg: `#f7f7f7`,
  font_primary: `"Roboto", sans-serif`,

  wb_grad: ` -webkit-linear-gradient(135deg, #FF9900, #FFC400)`,
  inset: ` inset 0 0 15px 0 rgba(0, 0, 0, 0.1)`,
  shadow: ` 0 0 10px rgba(0, 0, 0, 0.2), 0 6px 10px -4px rgba(0, 0, 0, 0.2)`,
  cubic: ` cubic-bezier(0.175, 0.885, 0.32, 1.275)`,

  wb_green: `#4caf50`,
  wb_red: `#f44336`,
  wb_blue: `#2196f3`,
  wb_orange: `#ff9834`,

  gutter_width: `25px`,
  gutter_width_more: `50px`,
  gutter_width_xs: `15px`,
}



function LightenDarkenColor(col,amt) {
    var usePound = false;
	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}
	var num = parseInt(col, 16);
	var r = (num >> 16) + amt;
	if (r > 255) {
		r = 255;
	} else if (r < 0) {
		r = 0;
	}
	var b = ((num >> 8) & 0x00FF) + amt;
	if (b > 255) {
		b = 255;
	} else if (b < 0) {
		b = 0;
	}
	var g = (num & 0x0000FF) + amt;
	if (g > 255) {
		g = 255;
	} else if (g < 0) {
		g = 0;
	}
	return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

export default Variables
