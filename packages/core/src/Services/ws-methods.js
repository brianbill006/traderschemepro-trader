/**
 * NOTE: This file is just a wrapper for the main BinarySocket.
 * The App ID (34GmfweMZyGgru7DXUrVy) is NOT defined here.
 * 
 * To change the WebSocket App ID, you must edit the actual socket configuration in:
 * 1. packages/core/src/_common/base/socket_base.js
 * 2. OR packages/shared/src/utils/url/url.ts (or wherever `getSocketURL()` is defined)
 */

import BinarySocket from '_common/base/socket_base';

const WS = BinarySocket;

export default WS;
