using System;

namespace Pulse.API.Domain.Entities;

public class Exercise
{
    public Guid Id {get; set;}

    public required string Name {get; set;}
}