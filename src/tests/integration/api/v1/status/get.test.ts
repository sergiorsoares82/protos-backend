describe('GET /api/v1/status', () => {
  it('should return status with version and uptime', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status');
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

    expect(responseBody.dependencies.database.version).toEqual('16.0');
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
    expect(responseBody.dependencies.database.opened_connections).toEqual(6);
  });
});
