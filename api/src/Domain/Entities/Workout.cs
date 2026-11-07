using System;

namespace Pulse.API.Domain.Entities;

public class Workout
{
    public Guid Id {get; set;}

    public List<Set> Sets {get; set;} = [];

    public DateTimeOffset StartTime {get; set;}

    public DateTimeOffset EndTime {get; set;}

}
