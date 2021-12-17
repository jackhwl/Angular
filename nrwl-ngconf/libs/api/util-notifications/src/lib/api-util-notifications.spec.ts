import { sendNotification } from './api-util-notifications';

describe('sendNotification', () => {
  it('should work', () => {
    expect(sendNotification('1')).toEqual('api-util-notifications');
  });
});
